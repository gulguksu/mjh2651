"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, PenLine, MessageCircle, ImagePlus, Trash2, Search } from "lucide-react"
import { ADMIN_USERNAME } from "@/lib/admin"

type Author = { id: string; username: string; name: string | null }
type PostListItem = {
  id: string
  title: string
  content: string
  imageUrl: string | null
  authorId: string
  author: Author
  createdAt: string
  _count: { comments: number }
}
type CommentItem = {
  id: string
  content: string
  authorId: string
  author: Author
  createdAt: string
}
type PostDetail = PostListItem & {
  comments: CommentItem[]
}

export default function BoardPage() {
  const searchParams = useSearchParams()
  const postIdFromUrl = searchParams.get("post")
  const { user, isLoading: authLoading } = useAuth()
  const [view, setView] = useState<"list" | "write" | "detail">("list")
  const [posts, setPosts] = useState<PostListItem[]>([])
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [writeTitle, setWriteTitle] = useState("")
  const [writeContent, setWriteContent] = useState("")
  const [writeImageUrl, setWriteImageUrl] = useState("")
  const [writeImageFile, setWriteImageFile] = useState<File | null>(null)
  const [writeDeletePassword, setWriteDeletePassword] = useState("")
  const [commentContent, setCommentContent] = useState("")

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")
  const [deleteSubmitting, setDeleteSubmitting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const [searchType, setSearchType] = useState<"all" | "title" | "content" | "author">("all")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [appliedSearch, setAppliedSearch] = useState<{ keyword: string; type: "all" | "title" | "content" | "author" }>({ keyword: "", type: "all" })

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/board/posts")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "목록 조회 실패")
      setPosts(data.posts ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다.")
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPostDetail = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/board/posts/${id}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "게시글 조회 실패")
      setPostDetail(data.post)
      setView("detail")
    } catch (e) {
      setError(e instanceof Error ? e.message : "게시글을 불러오지 못했습니다.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (postIdFromUrl) {
      setView("detail")
      fetchPostDetail(postIdFromUrl)
    } else {
      setView("list")
      fetchPosts()
    }
  }, [postIdFromUrl, fetchPostDetail, fetchPosts])

  useEffect(() => {
    if (view === "list" && !postIdFromUrl) fetchPosts()
  }, [view, postIdFromUrl, fetchPosts])

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSubmitting(true)
    setError(null)
    try {
      let imageUrl = writeImageUrl
      if (writeImageFile) {
        const formData = new FormData()
        formData.set("file", writeImageFile)
        const upRes = await fetch("/api/upload", { method: "POST", body: formData })
        const upData = await upRes.json()
        if (!upRes.ok) throw new Error(upData.error || "이미지 업로드 실패")
        imageUrl = upData.url
      }
      const res = await fetch("/api/board/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: writeTitle,
          content: writeContent,
          imageUrl: imageUrl || undefined,
          deletePassword: writeDeletePassword,
        }),
      })
      const data = await res.json()
      const errMsg =
        typeof data.error === "string"
          ? data.error
          : data.error?.deletePassword?.[0] || data.error?.title?.[0] || data.error?.content?.[0] || "작성 실패"
      if (!res.ok) throw new Error(errMsg)
      setWriteTitle("")
      setWriteContent("")
      setWriteImageUrl("")
      setWriteImageFile(null)
      setWriteDeletePassword("")
      setView("list")
      fetchPosts()
    } catch (e) {
      setError(e instanceof Error ? e.message : "작성에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !postDetail) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(`/api/board/posts/${postDetail.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentContent }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "댓글 작성 실패")
      setCommentContent("")
      fetchPostDetail(postDetail.id)
    } catch (e) {
      setError(e instanceof Error ? e.message : "댓글 작성에 실패했습니다.")
    } finally {
      setSubmitting(false)
    }
  }

  const isAdmin = user?.username === ADMIN_USERNAME

  const handleDeletePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postDetail) return
    setDeleteSubmitting(true)
    setDeleteError(null)
    try {
      const res = await fetch(`/api/board/posts/${postDetail.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isAdmin ? {} : { password: deletePassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "삭제 실패")
      setDeleteDialogOpen(false)
      setDeletePassword("")
      setPostDetail(null)
      setView("list")
      fetchPosts()
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "삭제에 실패했습니다.")
    } finally {
      setDeleteSubmitting(false)
    }
  }

  const openDetail = (id: string) => {
    setView("detail")
    fetchPostDetail(id)
  }

  const formatDate = (s: string) => {
    const d = new Date(s)
    return d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
  }

  const matchPost = (post: PostListItem, keyword: string, type: "all" | "title" | "content" | "author") => {
    const k = keyword.trim().toLowerCase()
    if (!k) return true
    const authorName = (post.author.name || post.author.username || "").toLowerCase()
    const title = post.title.toLowerCase()
    const content = post.content.toLowerCase()
    switch (type) {
      case "title":
        return title.includes(k)
      case "content":
        return content.includes(k)
      case "author":
        return authorName.includes(k)
      default:
        return title.includes(k) || content.includes(k) || authorName.includes(k)
    }
  }

  const filteredPosts = appliedSearch.keyword.trim()
    ? posts.filter((p) => matchPost(p, appliedSearch.keyword, appliedSearch.type))
    : posts

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setAppliedSearch({ keyword: searchKeyword, type: searchType })
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="font-mono text-3xl tracking-tight">게시판</h1>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← 메인으로
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {view === "list" && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6">
                <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-2">
                  <Select value={searchType} onValueChange={(v) => setSearchType(v as "all" | "title" | "content" | "author")}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="검색 범위" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="title">제목</SelectItem>
                      <SelectItem value="content">본문</SelectItem>
                      <SelectItem value="author">글쓴이</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="search"
                    placeholder="검색어 입력"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-[160px] sm:w-[200px]"
                  />
                  <Button type="submit" variant="secondary" size="sm" className="gap-1.5">
                    <Search className="size-4" />
                    검색
                  </Button>
                </form>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => user && setView("write")}
                    disabled={authLoading || !user}
                    className="gap-2"
                  >
                    <PenLine className="size-4" />
                    작성
                  </Button>
                  {!authLoading && !user && (
                    <span className="text-xs text-muted-foreground">로그인 후 작성 가능</span>
                  )}
                </div>
              </div>
              {loading ? (
                <p className="text-muted-foreground py-12 text-center">불러오는 중...</p>
              ) : posts.length === 0 ? (
                <p className="text-muted-foreground py-12 text-center">아직 게시글이 없습니다.</p>
              ) : filteredPosts.length === 0 ? (
                <p className="text-muted-foreground py-12 text-center">검색 결과가 없습니다.</p>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
                      onClick={() => openDetail(post.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-mono text-lg tracking-tight line-clamp-1">{post.title}</h3>
                          <span className="text-xs text-muted-foreground shrink-0">{formatDate(post.createdAt)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {post.author.username === ADMIN_USERNAME ? (
                            <span className="font-bold">{post.author.name || post.author.username}</span>
                          ) : (
                            post.author.name || post.author.username
                          )}{" "}
                          · 댓글 {post._count.comments}
                        </p>
                      </CardHeader>
                      {post.imageUrl && (
                        <div className="px-6 pb-2">
                          <div className="relative w-full aspect-video max-h-40 rounded-md overflow-hidden bg-muted">
                            <Image src={post.imageUrl} alt="" fill className="object-cover" sizes="672px" />
                          </div>
                        </div>
                      )}
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {view === "write" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="font-mono text-lg">새 게시글</h3>
                <Button variant="ghost" size="sm" onClick={() => setView("list")} className="gap-1">
                  <ArrowLeft className="size-4" />
                  목록
                </Button>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div>
                    <Label htmlFor="board-title">제목</Label>
                    <Input
                      id="board-title"
                      value={writeTitle}
                      onChange={(e) => setWriteTitle(e.target.value)}
                      placeholder="제목을 입력하세요"
                      required
                      maxLength={200}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>사진 (선택)</Label>
                    <div className="mt-1 flex flex-wrap gap-2 items-center">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md hover:bg-muted text-sm">
                        <ImagePlus className="size-4" />
                        파일 선택
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0]
                            setWriteImageFile(f || null)
                            setWriteImageUrl("")
                          }}
                        />
                      </label>
                      {writeImageFile && <span className="text-sm text-muted-foreground">{writeImageFile.name}</span>}
                      <span className="text-xs text-muted-foreground">또는 이미지 URL</span>
                      <Input
                        value={writeImageUrl}
                        onChange={(e) => {
                          setWriteImageUrl(e.target.value)
                          setWriteImageFile(null)
                        }}
                        placeholder="/uploads/ 또는 https://..."
                        className="max-w-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="board-content">본문</Label>
                    <Textarea
                      id="board-content"
                      value={writeContent}
                      onChange={(e) => setWriteContent(e.target.value)}
                      placeholder="본문을 입력하세요"
                      required
                      rows={6}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="board-delete-password">삭제용 비밀번호</Label>
                    <Input
                      id="board-delete-password"
                      type="password"
                      value={writeDeletePassword}
                      onChange={(e) => setWriteDeletePassword(e.target.value)}
                      placeholder="글 삭제 시 사용할 비밀번호"
                      required
                      maxLength={100}
                      className="mt-1 max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground mt-1">삭제할 때 이 비밀번호를 입력해야 합니다.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "등록 중..." : "등록"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setView("list")}>
                      취소
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {view === "detail" && postDetail && (
            <Card>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <h3 className="font-mono text-xl tracking-tight mb-1">{postDetail.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {postDetail.author.username === ADMIN_USERNAME ? (
                      <span className="font-bold">{postDetail.author.name || postDetail.author.username}</span>
                    ) : (
                      postDetail.author.name || postDetail.author.username
                    )}{" "}
                    · {formatDate(postDetail.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => setView("list")} className="gap-1">
                    <ArrowLeft className="size-4" />
                    목록
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-destructive hover:text-destructive"
                    onClick={() => {
                      setDeleteError(null)
                      setDeletePassword("")
                      setDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="size-4" />
                    삭제
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {postDetail.imageUrl && (
                  <div className="relative w-full aspect-video max-h-80 rounded-lg overflow-hidden bg-muted">
                    <Image src={postDetail.imageUrl} alt="" fill className="object-contain" sizes="672px" />
                  </div>
                )}
                <div className="whitespace-pre-wrap text-foreground">{postDetail.content}</div>

                <div className="border-t border-border pt-6">
                  <h4 className="font-mono text-sm font-medium mb-3 flex items-center gap-2">
                    <MessageCircle className="size-4" />
                    댓글 {postDetail.comments.length}
                  </h4>
                  <ul className="space-y-3 mb-6">
                    {postDetail.comments.length === 0 ? (
                      <li className="text-sm text-muted-foreground">아직 댓글이 없습니다.</li>
                    ) : (
                      postDetail.comments.map((c) => (
                        <li key={c.id} className="flex flex-col gap-1 py-2 px-3 rounded-md bg-muted/50">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              {c.author.username === ADMIN_USERNAME ? (
                                <span className="font-bold">{c.author.name || c.author.username}</span>
                              ) : (
                                c.author.name || c.author.username
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground">{formatDate(c.createdAt)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{c.content}</p>
                        </li>
                      ))
                    )}
                  </ul>
                  {!authLoading && user ? (
                    <form onSubmit={handleSubmitComment} className="flex gap-2">
                      <Textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        required
                        rows={2}
                        className="min-h-0 flex-1"
                      />
                      <Button type="submit" disabled={submitting} className="shrink-0 self-end">
                        {submitting ? "등록 중..." : "등록"}
                      </Button>
                    </form>
                  ) : (
                    <p className="text-sm text-muted-foreground py-2">로그인한 회원만 댓글을 작성할 수 있습니다.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {view === "detail" && loading && !postDetail && (
            <p className="text-muted-foreground py-12 text-center">불러오는 중...</p>
          )}
        </div>
      </main>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent showCloseButton={true}>
          <DialogHeader>
            <DialogTitle>게시글 삭제</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {isAdmin
                ? "관리자는 비밀번호 없이 삭제할 수 있습니다."
                : "글 작성 시 입력한 비밀번호를 입력하세요."}
            </p>
          </DialogHeader>
          <form onSubmit={handleDeletePost} className="space-y-4">
            {deleteError && (
              <p className="text-sm text-destructive">{deleteError}</p>
            )}
            {!isAdmin && (
              <div>
                <Label htmlFor="delete-password">비밀번호</Label>
                <Input
                  id="delete-password"
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="삭제용 비밀번호"
                  required
                  className="mt-1"
                />
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                취소
              </Button>
              <Button type="submit" variant="destructive" disabled={deleteSubmitting}>
                {deleteSubmitting ? "삭제 중..." : "삭제"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  )
}
