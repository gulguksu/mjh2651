import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Hero Image */}
      <div className="relative flex-1 min-h-[70vh]">
        <Image
          src="/images/hero-classroom.jpg"
          alt="아산신화초등학교 5학년 1반 교실 전경"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="font-mono text-5xl md:text-8xl lg:text-9xl text-background tracking-tighter leading-none text-balance">
              꿈이 자라는
              <br />
              교실
            </h1>
            <p className="mt-6 text-background/70 text-sm md:text-base max-w-md lg:max-w-xl leading-relaxed break-keep">
              <span className="block">함께 배우고, 함께 웃고, 함께 성장하는 우리 아산신화초등학교 5학년 1반.</span>
              <span className="block">매일이 새로운 발견이고, 매 순간이 특별한 추억입니다.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex items-center justify-center py-6 bg-background">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">우리 학급 키워드</span>
          <ArrowDown size={14} className="animate-bounce" aria-hidden />
        </div>
      </div>
    </section>
  )
}
