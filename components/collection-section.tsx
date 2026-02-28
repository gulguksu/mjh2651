import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const activities = [
  {
    id: "01",
    title: "미술 시간",
    subtitle: "Art Class",
    description: "그림으로 상상력을 펼치는 시간. 우리 반 친구들의 작품은 매번 놀라운 감동을 줍니다.",
    image: "/images/activity-art.jpg",
    tag: "BEST SELLER",
  },
  {
    id: "02",
    title: "과학 탐구",
    subtitle: "Science Lab",
    description: "직접 실험하고 발견하는 즐거움! 호기심이 지식이 되는 마법같은 시간입니다.",
    image: "/images/activity-science.jpg",
    tag: "NEW",
  },
  {
    id: "03",
    title: "독서 클럽",
    subtitle: "Reading Club",
    description: "책 속에서 세상을 만나는 시간. 친구들과 생각을 나누며 시야를 넓혀갑니다.",
    image: "/images/activity-reading.jpg",
    tag: "TRENDING",
  },
  {
    id: "04",
    title: "체육 활동",
    subtitle: "Sports Day",
    description: "몸도 마음도 건강하게! 운동장에서 뛰어놀며 팀워크와 스포츠맨십을 배웁니다.",
    image: "/images/activity-sports.jpg",
    tag: "HOT",
  },
]

export function CollectionSection() {
  return (
    <section id="collection" className="py-20 md:py-32 px-6 md:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Class Collection
            </p>
            <h2 className="font-mono text-4xl md:text-6xl tracking-tighter text-foreground leading-none text-balance">
              클래스
              <br />
              컬렉션
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            우리 반에서 가장 인기 있는 수업과 활동들을 모았습니다.
            어떤 것이 가장 마음에 드시나요?
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-card border border-border overflow-hidden hover:border-foreground/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 text-[10px] tracking-widest uppercase font-mono">
                    {activity.tag}
                  </span>
                </div>
                {/* Number */}
                <div className="absolute bottom-4 right-4">
                  <span className="font-mono text-6xl text-background/20 font-bold">
                    {activity.id}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-1">
                      {activity.subtitle}
                    </p>
                    <h3 className="font-mono text-xl md:text-2xl tracking-tight text-foreground">
                      {activity.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
