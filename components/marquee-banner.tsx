"use client"

export function MarqueeBanner() {
  const items = [
    "HANDCRAFTED",
    "SUSTAINABLE",
    "PREMIUM FABRICS",
    "ETHICAL FASHION",
    "TIMELESS DESIGN",
    "ARTISAN MADE",
    "LIMITED EDITIONS",
    "BESPOKE TAILORING",
  ]

  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.4em] uppercase mx-8 flex items-center gap-8"
          >
            {item}
            <span className="w-1.5 h-1.5 bg-accent rounded-full inline-block" />
          </span>
        ))}
      </div>
    </div>
  )
}
