"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const notices = [
  {
    date: "2026.02.24",
    tag: "NEW",
    title: "3월 현장학습 안내",
    content: "3월 20일(금) 국립과천과학관 현장학습이 예정되어 있습니다. 준비물과 일정은 추후 가정통신문으로 안내드리겠습니다.",
  },
  {
    date: "2026.02.20",
    tag: "IMPORTANT",
    title: "학부모 상담 주간 안내",
    content: "3월 첫째 주는 학부모 상담 주간입니다. 온라인 예약 시스템을 통해 상담 시간을 예약해 주세요.",
  },
  {
    date: "2026.02.15",
    tag: "EVENT",
    title: "봄맞이 교실 꾸미기",
    content: "새 학기를 맞아 교실을 함께 꾸밀 예정입니다. 아이들이 좋아하는 색종이나 스티커를 가져와 주세요.",
  },
  {
    date: "2026.02.10",
    tag: "NOTICE",
    title: "새 학기 준비물 안내",
    content: "새 학기에 필요한 학용품 목록을 안내드립니다. 연필(HB) 5자루, 지우개 2개, 30cm 자, 색연필 12색, A4 클리어파일 1개를 준비해 주세요.",
  },
]

export function NoticeSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="notice" className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              New Arrivals
            </p>
            <h2 className="font-mono text-4xl md:text-6xl tracking-tighter text-foreground leading-none text-balance">
              공지사항
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            우리 반의 최신 소식과 중요한 안내사항을 확인하세요.
          </p>
        </div>

        {/* Accordion-style notices */}
        <div className="border-t border-border">
          {notices.map((notice, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 md:py-8 text-left group"
              >
                <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                  <span className="font-mono text-xs text-muted-foreground hidden md:block shrink-0 w-24">
                    {notice.date}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] font-mono px-2 py-0.5 border border-border text-muted-foreground shrink-0">
                    {notice.tag}
                  </span>
                  <h3 className="font-mono text-sm md:text-lg tracking-tight text-foreground group-hover:text-accent transition-colors truncate">
                    {notice.title}
                  </h3>
                </div>
                <div className="w-8 h-8 border border-border flex items-center justify-center shrink-0 ml-4 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200">
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>
              {openIndex === i && (
                <div className="pb-6 md:pb-8 pl-0 md:pl-32">
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl md:hidden mb-2 font-mono">
                    {notice.date}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {notice.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
