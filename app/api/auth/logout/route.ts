import { NextResponse } from "next/server"
import { getSessionCookieHeader } from "@/lib/auth"

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.headers.set("Set-Cookie", getSessionCookieHeader())
  return res
}
