"use client"

import { useState } from "react"
import { useCart } from "@/app/context/cart-context"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { Trash2, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

export function CartSheet() {
    const { items, removeItem, totalItems, subtotal, isCartOpen, setIsCartOpen } =
        useCart()
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items }),
            })

            if (!response.ok) {
                throw new Error("Checkout failed")
            }

            const data = await response.json()
            window.location.href = data.url
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong with checkout")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="font-serif text-2xl">Shopping Bag</SheetTitle>
                    <SheetDescription>
                        You have {totalItems} item{totalItems !== 1 && "s"} in your cart.
                    </SheetDescription>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                        <ShoppingBag className="w-12 h-12 opacity-20" />
                        <p>Your bag is empty</p>
                    </div>
                ) : (
                    <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                        <div className="flex flex-col gap-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative aspect-[3/4] w-20 overflow-hidden bg-secondary rounded-sm">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="font-medium font-serif">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                ${item.price}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">
                                                Qty: {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="sr-only">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}

                {items.length > 0 && (
                    <SheetFooter className="sm:flex-col gap-4">
                        <Separator />
                        <div className="flex items-center justify-between font-medium">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="w-full bg-primary text-primary-foreground py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                "Checkout"
                            )}
                        </button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
