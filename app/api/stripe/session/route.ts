// app/api/stripe/session/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-07-30.basil" })

export async function GET(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id")
    if (!id) return NextResponse.json({ paid: false, error: "missing_id" }, { status: 400 })

    const session = await stripe.checkout.sessions.retrieve(id)
    const paid =
      session.payment_status === "paid" ||
      session.status === "complete"

    const md = session.metadata ?? {}
    let payload: Record<string, unknown> | null = null

    // recompose JSON depuis les chunks (plc = count, pl0..plN)
    try {
      const count = Number(md["plc"] ?? 0)
      if (count > 0) {
        let buf = ""
        for (let i = 0; i < count; i++) {
          buf += md[`pl${i}`] ?? ""
        }
        payload = JSON.parse(buf)
      }
    } catch {
      // ignore parse error
    }

    return NextResponse.json({
      paid,
      payload,       // ← utilisable côté /checkout/success
      metadata: md,  // debug éventuel
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("stripe session error", e)
    return NextResponse.json({ paid: false, error: "session_fetch_failed" }, { status: 500 })
  }
}
