// /app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || !whSecret) return NextResponse.json({ ok: true })

  const stripe = new Stripe(secret, { apiVersion: "2025-07-30.basil" })
  const sig = req.headers.get("stripe-signature")
  const raw = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", whSecret)
  } catch (e) {
    console.error("Webhook signature error", e)
    return new NextResponse("Bad signature", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    // TODO: déverrouiller le download si tu stockes un état
    // Pour MVP: rien, la page /checkout/success fera l’appel /api/generate-letter
  }

  return NextResponse.json({ received: true })
}
