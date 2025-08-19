"use client"
import { useEffect } from "react"

export function ScrollToTopOnChange({ dep }: { dep: unknown }) {
  useEffect(() => {
    // remonte en haut sur chaque changement de 'dep'
    const el = document.getElementById("wizard-top")
    if (el?.scrollIntoView) {
      el.scrollIntoView({ behavior: "instant", block: "start" } as ScrollIntoViewOptions)
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    }
  }, [dep])

  return null
}
