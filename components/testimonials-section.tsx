"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { ScrollReveal } from "./scroll-animations"

const testimonials = [
  {
    quote:
      "The craftsmanship is unparalleled. Every piece I own from ATELIER has become a staple in my wardrobe. The attention to detail is something you simply can't find elsewhere.",
    author: "Victoria Chen",
    role: "Fashion Editor, Vogue",
    rating: 5,
  },
  {
    quote:
      "I've never felt fabric this luxurious. From the moment I put on their cashmere sweater, I knew this brand was different. It's wearable art.",
    author: "James Ashworth",
    role: "Creative Director",
    rating: 5,
  },
  {
    quote:
      "Sustainability without compromise on style or quality. ATELIER proves that ethical fashion can be the most desirable fashion.",
    author: "Sophia Laurent",
    role: "Style Consultant",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [current])

  const goTo = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section id="stories" className="py-24 lg:py-32 px-6 lg:px-12 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-16">
            Voices of Elegance
          </h2>
        </ScrollReveal>

        <div className="relative min-h-[320px] flex items-center justify-center">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-10 max-w-3xl text-balance">
                {`"${testimonial.quote}"`}
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-sm font-medium text-foreground tracking-wide">
                  {testimonial.author}
                </p>
                <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mt-1">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={() =>
              goTo((current - 1 + testimonials.length) % testimonials.length)
            }
            className="p-3 border border-border hover:border-accent hover:text-accent transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-8 h-0.5 transition-all duration-300 ${
                  i === current ? "bg-accent" : "bg-border"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo((current + 1) % testimonials.length)}
            className="p-3 border border-border hover:border-accent hover:text-accent transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
