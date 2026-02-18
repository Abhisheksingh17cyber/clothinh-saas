"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { TextReveal } from "./scroll-animations"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const opacity = Math.max(0, 1 - scrollY / 600)
  const scale = 1 + scrollY * 0.0003
  const textY = scrollY * 0.3

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `scale(${scale})`, opacity }}
      >
        <Image
          src="/images/hero-model.svg"
          alt="Luxury fashion model wearing ATELIER clothing"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ transform: `translateY(${textY}px)`, opacity }}
      >
        <div className="mb-6">
          <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Handcrafted Excellence
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight text-foreground mb-8 text-balance">
          <TextReveal text="Where craft" />
          <br />
          <TextReveal text="meets elegance" delay={300} />
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-12">
          Every thread tells a story. Discover handcrafted luxury clothing where
          timeless elegance meets modern artistry.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#collections"
            className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            Explore Collections
          </a>
          <a
            href="#craft"
            className="border border-foreground/30 text-foreground px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </section>
  )
}
