import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"

const createCommentSchema = z.object({
  content: z.string().min(1, "댓글 내용을 입력해주세요.").max(1000),
})

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "로그인한 회원만 댓글을 작성할 수 있습니다." },
        { status: 401 }
      )
    }

    const { id: postId } = await params
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 })
    }

    const body = await req.json()
    const parsed = createCommentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const comment = await prisma.comment.create({
      data: {
        content: parsed.data.content,
        postId,
        authorId: user.id,
      },
      include: {
        author: { select: { id: true, username: true, name: true } },
      },
    })
    return NextResponse.json({ comment })
  } catch (e) {
    console.error("Board comment create error:", e)
    return NextResponse.json(
      { error: "댓글 작성에 실패했습니다." },
      { status: 500 }
    )
  }
}
