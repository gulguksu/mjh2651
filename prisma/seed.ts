import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../lib/auth"
import { ADMIN_USERNAME } from "../lib/admin"

const prisma = new PrismaClient()

const ADMIN_NAME = "민재홍선생님"
const ADMIN_PASSWORD = "admin"

async function main() {
  const existing = await prisma.user.findUnique({
    where: { username: ADMIN_USERNAME },
  })
  if (existing) {
    console.log("관리자 계정이 이미 존재합니다.")
    return
  }
  const hashed = await hashPassword(ADMIN_PASSWORD)
  await prisma.user.create({
    data: {
      username: ADMIN_USERNAME,
      password: hashed,
      name: ADMIN_NAME,
    },
  })
  console.log("관리자 계정이 생성되었습니다. (id: admin, 비밀번호: admin, 이름: 민재홍선생님)")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
