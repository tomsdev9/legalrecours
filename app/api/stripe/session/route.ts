import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
})

export async function GET(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id")
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 })
  try {
    const session = await stripe.checkout.sessions.retrieve(id, { expand: ["payment_intent"] })
    return NextResponse.json({
      id: session.id,
      paid: session.payment_status === "paid",
      email: session.customer_email,
    })
  } catch (e) {
    console.error("/api/stripe/session error:", e)
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }
}
