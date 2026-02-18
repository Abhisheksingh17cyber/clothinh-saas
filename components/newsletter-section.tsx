"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "./scroll-animations"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 relative z-10 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary-foreground/60">
            Stay Connected
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mt-3 mb-4">
            Join the Atelier
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed mb-12 max-w-lg mx-auto">
            Receive 10% off your first order, exclusive updates, early access to
            new collections, and stories from our atelier.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          {isSubmitted ? (
            <div className="py-6">
              <p className="font-serif text-xl text-primary-foreground">
                Welcome to the Atelier family.
              </p>
              <p className="text-sm text-primary-foreground/60 mt-2">
                Check your inbox for a special surprise.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b border-primary-foreground/30 py-3 px-0 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-primary-foreground text-primary px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center gap-2 shrink-0"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
