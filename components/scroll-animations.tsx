"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const getTransform = () => {
      switch (direction) {
        case "up":
          return "translateY(60px)"
        case "down":
          return "translateY(-60px)"
        case "left":
          return "translateX(60px)"
        case "right":
          return "translateX(-60px)"
        case "none":
          return "none"
      }
    }

    el.style.opacity = "0"
    el.style.transform = getTransform()
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1"
            el.style.transform = "translateY(0) translateX(0)"
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const scrolled = window.innerHeight - rect.top
          const offset = scrolled * speed * 0.15
          el.style.transform = `translateY(${offset}px)`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const chars = el.querySelectorAll<HTMLSpanElement>(".char")
    chars.forEach((char, i) => {
      char.style.opacity = "0"
      char.style.transform = "translateY(100%)"
      char.style.display = "inline-block"
      char.style.transition = `opacity 0.5s ease ${delay + i * 40}ms, transform 0.5s ease ${delay + i * 40}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((char) => {
              char.style.opacity = "1"
              char.style.transform = "translateY(0)"
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [delay, text])

  const words = text.split(" ")

  return (
    <span ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

export function HorizontalScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scroll = scrollRef.current
    if (!container || !scroll) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect()
          const containerHeight = container.offsetHeight
          const windowHeight = window.innerHeight

          if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = Math.max(
              0,
              Math.min(1, (windowHeight - rect.top) / (containerHeight + windowHeight))
            )
            const maxScroll = scroll.scrollWidth - container.offsetWidth
            scroll.style.transform = `translateX(-${progress * maxScroll}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className={`h-[200vh] relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div ref={scrollRef} className="flex will-change-transform">
          {children}
        </div>
      </div>
    </div>
  )
}
