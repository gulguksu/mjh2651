"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "우리 반 소개", href: "#about" },
  { label: "선생님", href: "#teacher" },
  { label: "갤러리", href: "#gallery" },
  { label: "공지사항", href: "#notice" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <div className="flex-1">
          <a href="/" className="font-mono text-xl tracking-tight text-foreground">
            5-1 CLASS.
          </a>
        </div>

        {/* Desktop Nav - 가운데 */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-1 justify-end items-center gap-2">
          {/* Desktop: 로그인/회원가입 또는 로그아웃 */}
          {!isLoading && (
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logout()}
                  className="gap-1.5"
                >
                  <LogOut className="size-4" />
                  로그아웃
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">로그인</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/signup">회원가입</Link>
                  </Button>
                </>
              )}
            </div>
          )}
          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            {!isLoading && (
              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {user ? (
                  <Button
                    variant="outline"
                    className="justify-start gap-2"
                    onClick={() => {
                      setIsOpen(false)
                      logout()
                    }}
                  >
                    <LogOut className="size-4" />
                    로그아웃
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        로그인
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        회원가입
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
