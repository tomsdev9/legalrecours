"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

function LegalRecoursLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      className={className + " w-auto"}
      viewBox="0 0 760 120"
      role="img"
      aria-label="LegalRecours"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="86"
        fill="#222223"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        fontWeight="800"
        fontSize="78"
        letterSpacing="-1.5"
      >
        LegalRecours
      </text>
    </svg>
  )
}

const navItems = [
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        role="banner"
        className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-[84%] max-w-2xl"
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={[
            "rounded-3xl border backdrop-blur-xl shadow-lg transition-all duration-300",
            scrolled ? "bg-white/95 border-gray-200 shadow-xl" : "bg-white/90 border-gray-100",
            "flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4",
          ].join(" ")}
        >
          <Link href="/" className="flex items-center shrink-0" aria-label="Accueil LegalRecours">
            <LegalRecoursLogo className="h-7 sm:h-9" />
          </Link>

          <nav className="hidden lg:flex items-center gap-2 sm:gap-3">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "relative px-4 py-2 rounded-xl text-sm font-medium",
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200",
                  "after:content-[''] after:absolute after:left-3 after:right-3 after:-bottom-0.5",
                  "after:h-[2px] after:bg-gray-900/80 after:rounded-full",
                  "after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              type="button"
              aria-label="Changer de langue"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
            >
              <Globe className="h-4 w-4" />
              <span>FR</span>
            </button>

            <span className="hidden xl:inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
              97% de réussite
            </span>

            <Button
              asChild
              className="px-5 py-2 bg-[#222223] hover:bg-black text-white font-medium text-sm rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Link href="/wizard">Créer mon courrier</Link>
            </Button>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </motion.button>
        </motion.div>
      </header>

      {/* Spacer */}
      <div aria-hidden className="h-28" />

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white/95 backdrop-blur-xl border-l border-gray-200 shadow-2xl lg:hidden flex flex-col overflow-y-auto"
              aria-label="Navigation mobile"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <LegalRecoursLogo className="h-7" />
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>

              <nav className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between px-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition"
                  >
                    <Globe className="h-4 w-4" />
                    FR
                  </button>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                    97% de réussite
                  </span>
                </div>

                <Link
                  href="/wizard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full px-6 py-3 bg-[#222223] hover:bg-black text-white font-medium text-sm rounded-xl transition-all duration-200"
                >
                  Créer mon courrier
                </Link>

                {navItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center w-full px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium text-sm rounded-xl transition-all duration-200 border border-gray-100"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
