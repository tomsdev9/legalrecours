// app/api/download/[id]/route.ts
import { getPdf } from "@/lib/storage"

export const runtime = "nodejs"

type RouteCtx = { params: { id: string } }

export async function GET(req: Request, { params }: RouteCtx) {
  const buf = await getPdf(params.id)

  if (!buf) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  // Buffer est un Uint8Array en Node, on force un Uint8Array pour TS
  const body = buf instanceof Uint8Array ? buf : new Uint8Array(buf as ArrayBufferLike)

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}
