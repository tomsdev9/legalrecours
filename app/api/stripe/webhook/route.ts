// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !whSecret) {
    // Mieux de signaler la mauvaise config pour le déploiement
    return new NextResponse("Stripe env vars missing", { status: 500 });
  }

  // Ne pas fixer apiVersion ici (utilise celle du Dashboard)
  const stripe = new Stripe(secret);
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", whSecret);
  } catch (e) {
    console.error("Webhook signature error", e);
    return new NextResponse("Bad signature", { status: 400 });
  }

  // Gère les événements utiles (tu peux en ajouter d’autres si besoin)
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      // 👉 Ici tu pourrais marquer la commande comme payée en base
      // Pour le MVP, rien : ta /checkout/success génère déjà le PDF côté client
      break;
    default:
      // noop
      break;
  }

  return NextResponse.json({ received: true });
}
