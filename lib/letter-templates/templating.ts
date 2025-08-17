// /lib/templating.ts

/** Remplace {{placeholders}} par les valeurs de data (stringifiées si nécessaire). */
export function renderTemplate(tpl: string, data: Record<string, unknown>) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => {
    const v = (data as Record<string, unknown>)[key]
    if (v === undefined || v === null) return ""
    return String(v)
  })
}

/** Petit cleanup visuel (sauts de lignes multiples, espaces fin de ligne) */
export function cleanupText(txt: string) {
  return txt.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+\n/g, "\n")
}
