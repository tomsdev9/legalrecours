// app/api/download/[id]/route.ts
import { getPdf } from "@/lib/storage"

export const runtime = "nodejs"

export async function GET(req: Request, context: unknown) {
  // ✅ pas d'alias de type ici, Next 15 lève une erreur → on caste localement
  const { params } = context as { params: { id: string } }

  const buf = await getPdf(params.id)
  if (!buf) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  // ✅ Response accepte Uint8Array (Buffer est compatible)
  const body = buf instanceof Uint8Array ? buf : new Uint8Array(buf as ArrayBufferLike)

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="courrier-${params.id}.pdf"`,
      "Cache-Control": "no-store",
    },
  })
}
