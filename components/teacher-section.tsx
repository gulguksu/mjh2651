import Image from "next/image"

export function TeacherSection() {
  return (
    <section id="teacher" className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[3/4] lg:aspect-auto overflow-hidden">
            <Image
              src="/images/teacher-portrait.jpg"
              alt="담임 선생님 프로필 사진"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground p-4 md:p-6">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1">
                Head Designer
              </p>
              <p className="font-mono text-lg tracking-tight">
                김하늘 선생님
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Meet the Teacher
            </p>
            <h2 className="font-mono text-4xl md:text-5xl tracking-tighter text-foreground leading-none mb-8 text-balance">
              담임 선생님을
              <br />
              소개합니다
            </h2>

            <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
              <p>
                {'"'}안녕하세요! 아산신화초등학교 5학년 1반 담임 민재홍입니다.
                아이들과 함께 웃고 배우는 매일이 저에게는 가장 큰 선물입니다.{'"'}
              </p>
              <p>
                공주교육대학교를 졸업한 후, 8년째 초등교육 현장에서
                아이들과 함께하고 있습니다. 프로젝트 기반 학습과
                협동 학습을 통해 아이들이 스스로 배움의 즐거움을
                발견할 수 있도록 돕고 있습니다.
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { label: "담당 과목", value: "전 과목" },
                { label: "교육 경력", value: "8년차" },
                { label: "교육 철학", value: "함께 성장" },
                { label: "특기", value: "미술 / 코딩" },
              ].map((item) => (
                <div key={item.label} className="border-t border-border pt-4">
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="font-mono text-sm text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
