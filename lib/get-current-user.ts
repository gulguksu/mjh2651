import { cookies } from "next/headers"
import { prisma } from "@/lib/db"
import { verifyToken, COOKIE_NAME } from "@/lib/auth"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, username: true, name: true },
  })
  return user
}
