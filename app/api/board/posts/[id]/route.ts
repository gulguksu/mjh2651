import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { verifyPassword } from "@/lib/auth"
import { getCurrentUser } from "@/lib/get-current-user"
import { isAdminUsername } from "@/lib/admin"

const deleteBodySchema = z.object({
  password: z.string().optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, name: true } },
        comments: {
          orderBy: { createdAt: "asc" },
          include: {
            author: { select: { id: true, username: true, name: true } },
          },
        },
      },
    })
    if (!post) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 })
    }
    const { deletePassword: _, ...rest } = post
    return NextResponse.json({ post: rest })
  } catch (e) {
    console.error("Board post get error:", e)
    return NextResponse.json(
      { error: "게시글을 불러오는데 실패했습니다." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const currentUser = await getCurrentUser()

    const post = await prisma.post.findUnique({
      where: { id },
      select: { id: true, deletePassword: true },
    })
    if (!post) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 })
    }

    // 관리자는 비밀번호 없이 모든 글 삭제 가능
    if (currentUser && isAdminUsername(currentUser.username)) {
      await prisma.post.delete({ where: { id } })
      return NextResponse.json({ success: true })
    }

    if (!post.deletePassword) {
      return NextResponse.json(
        { error: "이 글은 삭제용 비밀번호가 설정되지 않아 삭제할 수 없습니다." },
        { status: 400 }
      )
    }

    const body = await req.json()
    const parsed = deleteBodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const password = parsed.data.password
    if (!password || password.length === 0) {
      return NextResponse.json(
        { error: "비밀번호를 입력해주세요." },
        { status: 400 }
      )
    }

    const ok = await verifyPassword(password, post.deletePassword)
    if (!ok) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      )
    }

    await prisma.post.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Board post delete error:", e)
    return NextResponse.json(
      { error: "게시글 삭제에 실패했습니다." },
      { status: 500 }
    )
  }
}
