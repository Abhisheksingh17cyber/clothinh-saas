import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { CartItem } from "@/app/context/cart-context"

export async function POST(req: Request) {
    try {
        const { items } = await req.json()

        if (!items || items.length === 0) {
            return new NextResponse("No items in cart", { status: 400 })
        }

        // For demo purposes, we're using a hardcoded placeholder domain if not set
        const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

        const line_items = items.map((item: CartItem) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [domain + item.image], // Stripe expects absolute URLs
                },
                unit_amount: item.price * 100, // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }))

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${domain}/success`,
            cancel_url: `${domain}/cancel`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error("[CHECKOUT_ERROR]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
