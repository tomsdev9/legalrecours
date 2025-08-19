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

// util: ne garder que le nécessaire + éviter les grosses valeurs
function buildMinimalPayload(p: Payload): Payload {
  // on passe tel quel (ton context est court). Si besoin, tu peux tronquer certaines strings ici.
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

// util: découpage metadata (<=500 chars / valeur)
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

    // origine pour success_url/cancel_url
    const origin =
      req.headers.get("origin") ||
      `${req.headers.get("x-forwarded-proto") || "http"}://${req.headers.get("host")}`

    // construire un payload compact et le stocker en chunks
    const minimal = buildMinimalPayload(payload)
    const json = JSON.stringify(minimal)
    const parts = chunk(json, 480)
    const md: Record<string, string> = { plc: String(parts.length) }
    parts.forEach((part, i) => (md[`pl${i}`] = part))

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // 7,90 € TTC (prix unitaire)
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: 790,
            product_data: {
              name: "Lettre de réclamation PDF (IA)",
              description: "Génération d’un courrier PDF A4 personnalisé",
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/wizard`,
      metadata: md, // <<< payload stocké ici
      payment_intent_data: {
        description: "LegalRecours - Génération courrier PDF",
      },
      // (optionnel) billing_address_collection: "auto",
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("checkout error", err)
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 })
  }
}
