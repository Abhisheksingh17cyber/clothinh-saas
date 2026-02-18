"use client"

import { useEffect } from "react"
import { useCart } from "@/app/context/cart-context"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
    const { clearCart } = useCart()

    useEffect(() => {
        clearCart()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-500" />
                    </div>
                </div>
                <h1 className="text-3xl font-serif mb-4">Payment Successful!</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Thank you for your purchase. We have received your order and will begin processing it shortly.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
