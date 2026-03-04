"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

type Author = { id: string; username: string; name: string | null }
type PostPreview = {
  id: string
  title: string
  content: string
  imageUrl: string | null
  author: Author
  createdAt: string
  _count: { comments: number }
}

export function BoardSection() {
  const [latestPost, setLatestPost] = useState<PostPreview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function fetchLatest() {
      try {
        const res = await fetch("/api/board/posts")
        const data = await res.json()
        if (!res.ok || cancelled) return
        const posts = data.posts ?? []
        setLatestPost(posts.length > 0 ? posts[0] : null)
      } catch {
        if (!cancelled) setLatestPost(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchLatest()
    return () => { cancelled = true }
  }, [])

  const formatDate = (s: string) => {
    return new Date(s).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <section id="board" className="py-20 md:py-32 px-6 md:px-12 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Community
            </p>
            <h2 className="font-mono text-4xl md:text-6xl tracking-tighter text-foreground leading-none text-balance">
              게시판
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            로그인한 회원만 글쓰기와 댓글이 가능합니다.
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground py-12 text-center">불러오는 중...</p>
        ) : !latestPost ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <p className="text-muted-foreground">아직 게시글이 없습니다.</p>
            <Button asChild className="gap-2">
              <Link href="/board">
                게시판 바로가기
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
              <Link href={`/board?post=${latestPost.id}`} className="block">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-mono text-lg tracking-tight line-clamp-1">
                      {latestPost.title}
                    </h3>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDate(latestPost.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {latestPost.author.name || latestPost.author.username} · 댓글 {latestPost._count.comments}
                  </p>
                </CardHeader>
                {latestPost.imageUrl && (
                  <div className="px-6 pb-2">
                    <div className="relative w-full aspect-video max-h-40 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={latestPost.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    </div>
                  </div>
                )}
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {latestPost.content}
                  </p>
                </CardContent>
              </Link>
            </Card>
            <div className="mt-6 flex justify-end">
              <Button asChild variant="outline" className="gap-2">
                <Link href="/board">
                  More
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
