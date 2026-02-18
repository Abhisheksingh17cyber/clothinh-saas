"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export type CartItem = {
    id: number
    name: string
    price: number
    image: string
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">) => void
    removeItem: (id: number) => void
    clearCart: () => void
    openCart: () => void
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
    totalItems: number
    subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Load cart from local storage
    useEffect(() => {
        setIsMounted(true)
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    // Save cart to local storage
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, isMounted])

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === newItem.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...newItem, quantity: 1 }]
        })
        toast.success("Added to cart")
        setIsCartOpen(true)
    }

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
        toast.info("Removed from cart")
    }

    const clearCart = () => {
        setItems([])
        toast.info("Cart cleared")
    }

    const openCart = () => setIsCartOpen(true)

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                clearCart,
                openCart,
                isCartOpen,
                setIsCartOpen,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
