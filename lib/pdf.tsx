// /lib/pdf.tsx
import React, { type ReactElement } from "react"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  type DocumentProps,
} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: { 
    paddingTop: 56, 
    paddingHorizontal: 56, 
    paddingBottom: 72, 
    fontSize: 11, 
    fontFamily: "Times-Roman" 
  },
  row: { 
    display: "flex", 
    flexDirection: "row" 
  },
  right: { 
    marginLeft: "auto" 
  },
  spacer: { 
    height: 10 
  },
  headerBlock: { 
    marginBottom: 14, 
    lineHeight: 1.3 
  },
  destBlock: { 
    marginTop: 18, 
    marginBottom: 18, 
    lineHeight: 1.3 
  },
  subject: { 
    marginTop: 10, 
    marginBottom: 8, 
    fontSize: 12, 
    fontStyle: "italic" 
  },
  meta: { 
    fontSize: 10, 
    color: "#333", 
    marginBottom: 10, 
    lineHeight: 1.35 
  },
  body: { 
    lineHeight: 1.5, 
    textAlign: "justify" 
  },
  paragraph: { 
    marginBottom: 8 
  },
  signature: { 
    marginTop: 18, 
    lineHeight: 1.6 
  },
  footer: { 
    position: "absolute", 
    fontSize: 9, 
    left: 56, 
    right: 56, 
    bottom: 32, 
    textAlign: "center", 
    color: "#666" 
  }
})

function splitParagraphs(text: string) {
  return text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
}

type LetterPageProps = {
  sender: { name: string; address: string; zipCity: string }
  dest: { lines: string[] }
  cityDate: string
  subject: string
  metaLines?: string[]
  body: string
  signName: string
}

function LetterPage(props: LetterPageProps): ReactElement {
  const paras = splitParagraphs(props.body)
  
  return (
    <Page size="A4" style={styles.page}>
      {/* En-tête expéditeur */}
      <View style={styles.headerBlock}>
        <Text>{props.sender.name}</Text>
        <Text>{props.sender.address}</Text>
        <Text>{props.sender.zipCity}</Text>
        <View style={styles.spacer} />
        <View style={styles.row}>
          <View />
          <Text style={styles.right}>{props.cityDate}</Text>
        </View>
      </View>

      {/* Destinataire */}
      <View style={styles.destBlock}>
        {props.dest.lines.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
      </View>

      {/* Objet */}
      <Text style={styles.subject}>Objet : {props.subject}</Text>

      {/* Méta-informations (référence, montant, date, n° dossier) */}
      {props.metaLines && props.metaLines.length > 0 && (
        <Text style={styles.meta}>
          {props.metaLines.join(" · ")}
        </Text>
      )}

      {/* Corps de la lettre */}
      <View style={styles.body}>
        {paras.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </View>

      {/* Signature */}
      <View style={styles.signature}>
        <Text>
          Je vous prie d&apos;agréer, Madame, Monsieur, l&apos;expression de mes salutations distinguées.
        </Text>
        <View style={{ height: 24 }} />
        <Text>{props.signName}</Text>
      </View>

      {/* Pied de page avec numérotation */}
      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  )
}

function createLetterDocument(args: {
  sender: { name: string; address: string; zipCity: string }
  destLines: string[]
  cityDate: string
  subject: string
  metaLines?: string[]
  body: string
  signName: string
}): ReactElement<DocumentProps> {
  return (
    <Document>
      <LetterPage
        sender={args.sender}
        dest={{ lines: args.destLines }}
        cityDate={args.cityDate}
        subject={args.subject}
        metaLines={args.metaLines}
        body={args.body}
        signName={args.signName}
      />
    </Document>
  )
}

type PDFInstance = {
  toBuffer?: () => Promise<Uint8Array | Buffer | ReadableStream<Uint8Array> | string>
  toBlob?: () => Promise<Blob>
  toString?: () => string | Promise<string>
}

function isPromiseLike<T>(v: unknown): v is PromiseLike<T> {
  return !!v && (typeof v === "object" || typeof v === "function") && typeof (v as PromiseLike<T>).then === "function"
}

function isReadableStream(u: unknown): u is ReadableStream<Uint8Array> {
  return !!u && typeof (u as ReadableStream<Uint8Array>).getReader === "function"
}

async function readableStreamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const reader = stream.getReader()
  const chunks: Uint8Array[] = []
  
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) chunks.push(value)
  }
  
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const merged = new Uint8Array(total)
  let offset = 0
  
  for (const chunk of chunks) { 
    merged.set(chunk, offset)
    offset += chunk.length 
  }
  
  return Buffer.from(merged)
}

export async function renderLetterPdfBuffer(args: {
  sender: { 
    firstName: string
    lastName: string
    address: string
    zipCode: string
    city: string 
  }
  destLines: string[]
  dateStr: string
  subject: string
  finalText: string
  metaLines?: string[]
}): Promise<Buffer> {
  
  const doc: ReactElement<DocumentProps> = createLetterDocument({
    sender: {
      name: `${args.sender.firstName} ${args.sender.lastName}`,
      address: args.sender.address,
      zipCity: `${args.sender.zipCode} ${args.sender.city}`,
    },
    destLines: args.destLines,
    cityDate: args.dateStr,
    subject: args.subject,
    metaLines: args.metaLines,
    body: args.finalText,
    signName: `${args.sender.firstName} ${args.sender.lastName}`,
  })

  const instance = pdf(doc) as unknown as PDFInstance

  // Tentative de conversion en Buffer selon les méthodes disponibles
  if (typeof instance.toBuffer === "function") {
    const output = await instance.toBuffer()
    
    if (Buffer.isBuffer(output)) {
      return output
    }
    
    if (output instanceof Uint8Array) {
      return Buffer.from(output)
    }
    
    if (isReadableStream(output)) {
      return readableStreamToBuffer(output)
    }
    
    if (typeof output === "string") {
      return Buffer.from(output, "binary")
    }
  }
  
  if (typeof instance.toBlob === "function") {
    const blob = await instance.toBlob()
    const arrayBuffer = await blob.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }
  
  if (typeof instance.toString === "function") {
    const result = instance.toString()
    const stringResult = isPromiseLike<string>(result) ? await result : result
    return Buffer.from(stringResult, "binary")
  }
  
  throw new Error("Impossible de convertir le PDF en Buffer dans cet environnement.")
}