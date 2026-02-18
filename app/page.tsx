import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MarqueeBanner } from "@/components/marquee-banner"
import { ProductShowcase } from "@/components/product-showcase"
import { CollectionsSection } from "@/components/collections-section"
import { CraftProcessSection } from "@/components/craft-process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { SiteFooter } from "@/components/site-footer"
import { ClothAnimation } from "@/components/cloth-animation-wrapper"

export default function Home() {
  return (
    <main className="relative">
      {/* Animated cloth-making background */}
      <ClothAnimation />

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <HeroSection />

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Collections */}
      <CollectionsSection />

      {/* Craft Process */}
      <CraftProcessSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <SiteFooter />
    </main>
  )
}
