"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ScrollReveal, Parallax } from "./scroll-animations"

const collections = [
  {
    title: "Spring Linen",
    subtitle: "The New Season",
    description:
      "Lightweight, breathable pieces designed for effortless transitions between day and evening.",
    image: "/images/collection-spring.svg",
    count: "24 Pieces",
  },
  {
    title: "Essential Edit",
    subtitle: "Timeless Wardrobe",
    description:
      "The foundation of every exceptional wardrobe. Masterfully crafted staples that transcend trends.",
    image: "/images/collection-essentials.svg",
    count: "18 Pieces",
  },
]

export function CollectionsSection() {
  return (
    <section
      id="collections"
      className="py-24 lg:py-32 px-6 lg:px-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
              Discover
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-3 text-balance">
              Our Collections
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-24">
          {collections.map((collection, i) => (
            <ScrollReveal
              key={collection.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={200}
            >
              <div
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <Parallax speed={0.3} className="flex-1 w-full">
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/0 transition-colors duration-500" />
                  </div>
                </Parallax>

                {/* Content */}
                <div className="flex-1 w-full lg:max-w-md">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                    {collection.subtitle}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mt-3 mb-6">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {collection.description}
                  </p>
                  <span className="text-xs tracking-[0.2em] uppercase text-accent mb-8 block">
                    {collection.count}
                  </span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors group/link"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
