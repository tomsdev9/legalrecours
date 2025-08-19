// lib/storage.ts
import { promises as fs } from "fs"
import { join } from "path"
import { randomUUID } from "crypto"

const BASE = join(process.cwd(), ".data", "pdfs")

async function ensureDir() {
  await fs.mkdir(BASE, { recursive: true })
}

export async function putPdf(buf: Buffer): Promise<string> {
  await ensureDir()
  const id = randomUUID()
  await fs.writeFile(join(BASE, `${id}.pdf`), buf)
  return id
}

export async function getPdf(id: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(join(BASE, `${id}.pdf`))
  } catch {
    return null
  }
}
