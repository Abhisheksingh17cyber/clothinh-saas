"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"
import { useRef } from "react"
import { ScrollReveal } from "./scroll-animations"
import { useCart } from "@/app/context/cart-context"

const products = [
  {
    id: 1,
    name: "Cashmere Knit Sweater",
    price: 380,
    category: "Knitwear",
    image: "/images/product-1.svg",
    isNew: true,
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    price: 620,
    category: "Outerwear",
    image: "/images/product-2.svg",
    isNew: false,
  },
  {
    id: 3,
    name: "Silk Ivory Blouse",
    price: 290,
    category: "Tops",
    image: "/images/product-3.svg",
    isNew: true,
  },
  {
    id: 4,
    name: "Premium Linen Trousers",
    price: 340,
    category: "Bottoms",
    image: "/images/product-4.svg",
    isNew: false,
  },
]

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { addItem } = useCart()

  return (
    <ScrollReveal delay={index * 150} direction="up">
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"
              }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Overlay Actions */}
          <div
            className={`absolute inset-0 bg-foreground/10 flex items-end justify-center pb-6 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
              }`}
          >
            <button
              onClick={() => addItem(product)}
              className="bg-card text-card-foreground px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 p-2 bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isLiked
                ? "fill-destructive text-destructive"
                : "text-card-foreground"
                }`}
            />
          </button>

          {/* New Badge */}
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
              New
            </span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            {product.category}
          </span>
          <h3 className="font-serif text-lg text-foreground mt-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            ${product.price}
          </p>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function ProductShowcase() {
  return (
    <section id="products" className="py-24 lg:py-32 px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                Curated Selection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mt-3 text-balance">
                New Arrivals
              </h2>
            </div>
            <a
              href="#"
              className="mt-6 md:mt-0 text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground transition-colors border-b border-foreground/30 pb-1 self-start"
            >
              View All Products
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
