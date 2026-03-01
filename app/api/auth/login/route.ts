import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { verifyPassword, createToken, setSessionCookieHeader } from "@/lib/auth"
import { ID_PASSWORD_REGEX, ID_PASSWORD_MESSAGE } from "@/lib/validation"

const bodySchema = z.object({
  username: z
    .string()
    .min(1, "아이디를 입력해주세요.")
    .regex(ID_PASSWORD_REGEX, ID_PASSWORD_MESSAGE),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요.")
    .regex(ID_PASSWORD_REGEX, ID_PASSWORD_MESSAGE),
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
    const { username, password } = parsed.data

    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) {
      return NextResponse.json(
        { error: { username: ["아이디 또는 비밀번호가 올바르지 않습니다."] } },
        { status: 401 }
      )
    }

    const ok = await verifyPassword(password, user.password)
    if (!ok) {
      return NextResponse.json(
        { error: { username: ["아이디 또는 비밀번호가 올바르지 않습니다."] } },
        { status: 401 }
      )
    }

    const token = await createToken({ userId: user.id, username: user.username })
    const res = NextResponse.json({
      user: { id: user.id, username: user.username, name: user.name },
    })
    res.headers.set("Set-Cookie", setSessionCookieHeader(token))
    return res
  } catch (e) {
    console.error("Login error:", e)
    return NextResponse.json(
      { error: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
