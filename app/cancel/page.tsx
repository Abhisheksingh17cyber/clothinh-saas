import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CancelPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                        <XCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
                    </div>
                </div>
                <h1 className="text-3xl font-serif mb-4">Payment Cancelled</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Your payment was cancelled. No charges were made to your account.
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
