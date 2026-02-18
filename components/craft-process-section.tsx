"use client"

import Image from "next/image"
import { ScrollReveal } from "./scroll-animations"

const steps = [
  {
    number: "01",
    title: "Source",
    description:
      "We partner with ethical farms and mills across the globe to source the finest natural fibers -- cashmere, silk, and organic cotton.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our designers blend traditional silhouettes with contemporary lines, creating pieces that feel both timeless and modern.",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "Each garment is cut and sewn by master artisans in our atelier, with meticulous attention to every stitch and seam.",
  },
  {
    number: "04",
    title: "Finish",
    description:
      "The final touches -- hand-pressed seams, natural dyes, and individually inspected quality -- make every piece exceptional.",
  },
]

export function CraftProcessSection() {
  return (
    <section
      id="craft"
      className="py-24 lg:py-32 relative z-10 bg-card"
    >
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Image */}
          <ScrollReveal direction="left" className="flex-1">
            <div className="sticky top-24">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/craft-atelier.svg"
                  alt="Artisan hands crafting a garment in the atelier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-foreground/5" />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Process Steps */}
          <div className="flex-1 flex flex-col justify-center">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                Our Process
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
                The Art of Making
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-16">
                From raw fiber to finished garment, every step is guided by a
                dedication to quality and a respect for the craft.
              </p>
            </ScrollReveal>

            <div className="flex flex-col gap-12">
              {steps.map((step, i) => (
                <ScrollReveal key={step.number} delay={i * 100}>
                  <div className="flex gap-6 group">
                    <span className="font-serif text-4xl text-accent/40 group-hover:text-accent transition-colors duration-300 shrink-0">
                      {step.number}
                    </span>
                    <div className="pt-2 border-t border-border flex-1">
                      <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
