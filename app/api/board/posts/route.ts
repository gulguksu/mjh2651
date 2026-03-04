import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/get-current-user"
import { hashPassword } from "@/lib/auth"

const createPostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요.").max(200),
  content: z.string().min(1, "본문을 입력해주세요."),
  imageUrl: z.string().max(2000).optional().or(z.literal("")),
  deletePassword: z.string().min(1, "삭제용 비밀번호를 입력해주세요.").max(100),
})

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, username: true, name: true } },
        _count: { select: { comments: true } },
      },
    })
    return NextResponse.json({ posts })
  } catch (e) {
    console.error("Board posts list error:", e)
    return NextResponse.json(
      { error: "게시글 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "로그인한 회원만 게시글을 작성할 수 있습니다." },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parsed = createPostSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { title, content, imageUrl, deletePassword } = parsed.data
    const hashedPassword = await hashPassword(deletePassword)
    const post = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || undefined,
        deletePassword: hashedPassword,
        authorId: user.id,
      },
      include: {
        author: { select: { id: true, username: true, name: true } },
      },
    })
    return NextResponse.json({ post })
  } catch (e) {
    console.error("Board post create error:", e)
    const message =
      e instanceof Error && e.message
        ? e.message
        : "게시글 작성에 실패했습니다."
    const isPrisma = message.includes("Unknown arg") || message.includes("Invalid prisma")
    return NextResponse.json(
      { error: isPrisma ? "DB 스키마가 최신이 아닐 수 있습니다. 터미널에서 npx prisma generate && npx prisma db push 를 실행해 주세요." : message },
      { status: 500 }
    )
  }
}
