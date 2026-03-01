import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MarqueeBanner } from "@/components/marquee-banner"
import { AboutSection } from "@/components/about-section"
import { TeacherSection } from "@/components/teacher-section"
import { GallerySection } from "@/components/gallery-section"
import { NoticeSection } from "@/components/notice-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <TeacherSection />
      <GallerySection />
      <NoticeSection />
      <Footer />
    </main>
  )
}
