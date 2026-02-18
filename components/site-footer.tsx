"use client"

import { ScrollReveal } from "./scroll-animations"

const footerLinks = {
  Shop: ["New Arrivals", "Best Sellers", "Knitwear", "Outerwear", "Accessories"],
  Company: ["Our Story", "Sustainability", "Careers", "Press"],
  Support: ["Size Guide", "Shipping", "Returns", "Contact Us", "FAQ"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
}

export function SiteFooter() {
  return (
    <footer className="py-16 lg:py-24 px-6 lg:px-12 relative z-10 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16">
            {/* Brand */}
            <div className="lg:max-w-sm">
              <h2 className="font-serif text-3xl tracking-wider text-card-foreground mb-4">
                ATELIER
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Handcrafted luxury clothing where timeless elegance meets
                modern design. Every thread tells a story of exceptional
                craftsmanship.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="text-xs tracking-[0.3em] uppercase text-card-foreground mb-4">
                    {category}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-muted-foreground hover:text-card-foreground transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            2026 ATELIER. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "Pinterest", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-muted-foreground hover:text-card-foreground tracking-wider uppercase transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Large Brand Watermark */}
        <div className="mt-16 overflow-hidden">
          <p className="font-serif text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none text-foreground/[0.03] tracking-wider text-center select-none">
            ATELIER
          </p>
        </div>
      </div>
    </footer>
  )
}
