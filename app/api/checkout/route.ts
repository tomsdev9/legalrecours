import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
})

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") ?? "http://localhost:3000"
    const { email, organism, caseId } = (await req.json().catch(() => ({}))) as {
      email?: string; organism?: string; caseId?: string
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: 790, // 7,90€
            product_data: {
              name: "Lettre administrative IA (PDF)",
              description: caseId ? `Cas: ${caseId}` : "Courrier personnalisé",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        organism: organism ?? "",
        caseId: caseId ?? "",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error("/api/checkout error:", e)
    return NextResponse.json({ error: "Unable to create session" }, { status: 500 })
  }
}
