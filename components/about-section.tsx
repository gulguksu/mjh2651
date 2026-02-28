import { Users, BookOpen, Heart, Star } from "lucide-react"

const stats = [
  { icon: Users, label: "우리 반 친구들", value: "7", unit: "명" },
  { icon: BookOpen, label: "올해 읽은 책", value: "342", unit: "권" },
  { icon: Heart, label: "함께한 날", value: "180", unit: "일" },
  { icon: Star, label: "받은 칭찬", value: "1,204", unit: "개" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              About our class
            </p>
            <h2 className="font-mono text-4xl md:text-6xl tracking-tighter text-foreground leading-none text-balance">
              우리 반을
              <br />
              소개합니다
            </h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
            서로 다른 꿈을 가진 7명의 친구들이 모여
            하나의 팀이 되었습니다. 우리는 서로를 응원하고,
            함께 성장하는 것을 가장 소중히 여깁니다.
          </p>
        </div>

        {/* Stats Grid - Product-card style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-card border border-border p-6 md:p-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
            >
              <stat.icon
                size={20}
                className="text-muted-foreground group-hover:text-primary-foreground/70 transition-colors mb-6"
              />
              <div className="font-mono text-4xl md:text-5xl tracking-tighter text-foreground group-hover:text-primary-foreground transition-colors">
                {stat.value}
                <span className="text-sm tracking-normal text-muted-foreground group-hover:text-primary-foreground/70 transition-colors ml-1">
                  {stat.unit}
                </span>
              </div>
              <p className="mt-2 text-xs tracking-wide text-muted-foreground group-hover:text-primary-foreground/70 transition-colors uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
