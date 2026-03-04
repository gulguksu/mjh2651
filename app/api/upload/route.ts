import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/get-current-user"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: "로그인한 회원만 이미지를 업로드할 수 있습니다." },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "파일을 선택해주세요." },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "JPEG, PNG, GIF, WebP 이미지만 업로드 가능합니다." },
        { status: 400 }
      )
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "파일 크기는 5MB 이하여야 합니다." },
        { status: 400 }
      )
    }

    await mkdir(UPLOAD_DIR, { recursive: true })
    const ext = path.extname(file.name) || ".jpg"
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes))

    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (e) {
    console.error("Upload error:", e)
    return NextResponse.json(
      { error: "이미지 업로드에 실패했습니다." },
      { status: 500 }
    )
  }
}
