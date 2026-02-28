"use client"

export function MarqueeBanner() {
  const items = [
    "창의력", "협동심", "독서", "5학년 1반", "민재홍선생님", "체육", "건강", "토론",
    "코딩", "영어", "수학", "글쓰기", "멋쟁이"
  ]

  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-6 text-xs tracking-[0.2em] uppercase font-mono">
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
