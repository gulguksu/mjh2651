"use client"

import Image from "next/image"
import { useState } from "react"

const galleryItems = [
  { src: "/images/activity-art.jpg", title: "미술 시간", category: "ART" },
  { src: "/images/activity-science.jpg", title: "과학 실험", category: "SCIENCE" },
  { src: "/images/hero-classroom.jpg", title: "우리 교실", category: "DAILY" },
  { src: "/images/activity-reading.jpg", title: "독서 시간", category: "READING" },
  { src: "/images/activity-sports.jpg", title: "체육 시간", category: "SPORTS" },
  { src: "/images/teacher-portrait.jpg", title: "선생님과 함께", category: "TOGETHER" },
]

const categories = ["ALL", "ART", "SCIENCE", "DAILY", "READING", "SPORTS", "TOGETHER"]

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("ALL")

  const filteredItems = activeFilter === "ALL"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter)

  return (
    <section id="gallery" className="py-20 md:py-32 px-6 md:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-3">
              Lookbook
            </p>
            <h2 className="font-mono text-4xl md:text-6xl tracking-tighter text-foreground leading-none text-balance">
              포토
              <br />
              갤러리
            </h2>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-mono border transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredItems.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-end p-4">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[10px] tracking-[0.3em] text-background/70 uppercase font-mono">
                    {item.category}
                  </p>
                  <p className="text-background font-mono text-sm tracking-tight">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
