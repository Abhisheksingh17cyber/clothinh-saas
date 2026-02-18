import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { CartItem } from "@/app/context/cart-context"

export async function POST(req: Request) {
    try {
        const { items } = await req.json()

        if (!items || items.length === 0) {
            return new NextResponse(JSON.stringify({ error: "No items in cart" }), { status: 400 })
        }

        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith("sk_test_mock")) {
            return new NextResponse(JSON.stringify({ error: "Stripe Secret Key is missing or invalid. Please add it to your .env file." }), { status: 500 })
        }

        // Determine domain dynamically
        const origin = req.headers.get("origin")
        const domain = process.env.NEXT_PUBLIC_APP_URL || origin || "http://localhost:3000"

        const line_items = items.map((item: CartItem) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: [item.image.startsWith("http") ? item.image : `${domain}${item.image}`],
                },
                unit_amount: item.price * 100,
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
    } catch (error: any) {
        console.error("[CHECKOUT_ERROR]", error)
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
