import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { hashPassword, createToken, setSessionCookieHeader } from "@/lib/auth"
import { ID_PASSWORD_REGEX, ID_PASSWORD_MESSAGE } from "@/lib/validation"

const bodySchema = z.object({
  username: z
    .string()
    .min(1, "아이디를 입력해주세요.")
    .regex(ID_PASSWORD_REGEX, ID_PASSWORD_MESSAGE),
  password: z
    .string()
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .regex(ID_PASSWORD_REGEX, ID_PASSWORD_MESSAGE),
  name: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = bodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    const { username, password, name } = parsed.data

    const existing = await prisma.user.findUnique({ where: { username } })
    if (existing) {
      return NextResponse.json(
        { error: { username: ["이미 사용 중인 아이디입니다."] } },
        { status: 400 }
      )
    }

    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: { username, password: hashed, name: name || null },
    })

    const token = await createToken({ userId: user.id, username: user.username })
    const res = NextResponse.json({
      user: { id: user.id, username: user.username, name: user.name },
    })
    res.headers.set("Set-Cookie", setSessionCookieHeader(token))
    return res
  } catch (e) {
    console.error("Register error:", e)
    return NextResponse.json(
      { error: "회원가입 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
