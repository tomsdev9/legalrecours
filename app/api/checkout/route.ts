// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Payload = {
  organism: string
  caseId: string
  contextData: Record<string, unknown>
  userInfo: Record<string, unknown>
}

function buildMinimalPayload(p: Payload): Payload {
  return {
    organism: p.organism,
    caseId: p.caseId,
    contextData: p.contextData || {},
    userInfo: {
      firstName: p.userInfo?.["firstName"] ?? "",
      lastName: p.userInfo?.["lastName"] ?? "",
      address: p.userInfo?.["address"] ?? "",
      city: p.userInfo?.["city"] ?? "",
      zipCode: p.userInfo?.["zipCode"] ?? "",
      cafNumber: p.userInfo?.["cafNumber"] ?? "",
      cpamNumber: p.userInfo?.["cpamNumber"] ?? "",
      poleEmploiNumber: p.userInfo?.["poleEmploiNumber"] ?? "",
      email: p.userInfo?.["email"] ?? "",
    },
  }
}

// découpage metadata (<= 500 chars)
function chunk(str: string, size = 480): string[] {
  const out: string[] = []
  for (let i = 0; i < str.length; i += size) out.push(str.slice(i, i + size))
  return out
}

export async function POST(req: NextRequest) {
  try {
    const { payload } = (await req.json()) as { payload: Payload }
    if (!payload?.organism || !payload?.caseId) {
      return NextResponse.json({ error: "missing_payload" }, { status: 400 })
    }

    // ✅ Utilise ton domaine prod si présent, sinon fallback headers
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      `${req.headers.get("x-forwarded-proto") || "https"}://${req.headers.get("host")}`

    const minimal = buildMinimalPayload(payload)
    const json = JSON.stringify(minimal)
    const parts = chunk(json, 480)
    const md: Record<string, string> = { plc: String(parts.length) }
    parts.forEach((part, i) => (md[`pl${i}`] = part))

    const email =
      typeof minimal.userInfo?.["email"] === "string" && minimal.userInfo["email"] ? String(minimal.userInfo["email"]) : undefined

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // ✅ Utilise ton Price LIVE (ENV: STRIPE_PRICE_ID)
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/wizard`,
      metadata: md,
      payment_intent_data: {
        description: "LegalRecours - Génération courrier PDF",
      },
      customer_email: email, // ✅ reçu email Stripe
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err) {
    console.error("checkout error", err)
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 })
  }
}
