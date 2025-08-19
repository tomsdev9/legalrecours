// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";
import CookieBanner from "@/components/CookieBanner"; // bandeau cookies (client)
import CookiePreferencesButton from "@/components/CookiePreferencesButton"; // bouton (client)

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://legalrecours.fr"),
  title: {
    default: "LegalRecours.fr - Vos droits défendus en 2 minutes",
    template: "%s — LegalRecours.fr",
  },
  description:
    "Générez des courriers de réclamation professionnels pour CAF, CPAM, France Travail. Contestations, remboursements, radiation.",
  keywords: [
    "réclamation CAF",
    "contestation CPAM",
    "radiation France Travail",
    "courrier administratif",
    "IA juridique",
  ],
  authors: [{ name: "LegalRecours" }],
  openGraph: {
    title: "LegalRecours.fr - Expert en réclamations administratives",
    description:
      "Fini la galère administrative ! Générez vos courriers de réclamation en 2 minutes.",
    url: "https://legalrecours.fr",
    siteName: "LegalRecours",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LegalRecours - Réclamations administratives",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalRecours.fr - Vos droits défendus",
    description:
      "Générez des courriers de réclamation professionnels en 2 minutes.",
    images: ["/og-image.jpg"],
    creator: "@legalrecours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logolegalrecours.png", type: "image/png", sizes: "32x32" },
      { url: "/logolegalrecours.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/logolegalrecours.png" }],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <div className="relative min-h-screen bg-white">
          {/* Fond subtil avec motif */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100 opacity-50 pointer-events-none" />

          {/* Header global */}
          <Header />

          {/* Contenu principal */}
          <main className="relative z-10">{children}</main>

          {/* Footer global */}
          <footer className="relative z-10 border-t border-gray-200 bg-white/90 backdrop-blur-sm">
            <div className="container-custom py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LR</span>
                  </div>
                  <span className="text-gray-900 font-semibold">LegalRecours.fr</span>
                </div>

                {/* Liens légaux */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <Link href="/conditions-utilisation" className="hover:text-gray-900 transition-colors">
                    Conditions d’utilisation
                  </Link>
                  <Link href="/politique-de-confidentialite" className="hover:text-gray-900 transition-colors">
                    Politique de confidentialité
                  </Link>
                  <Link href="/dpa" className="hover:text-gray-900 transition-colors">
                    DPA
                  </Link>
                  <a href="mailto:contact@legalrecours.fr" className="hover:text-gray-900 transition-colors">
                    Contact
                  </a>
                  {/* Bouton client (pas d'onClick dans un Server Component) */}
                  <CookiePreferencesButton className="underline underline-offset-2 hover:text-gray-900 transition-colors" />
                </div>

                <div className="flex gap-4">
                  <a
                    href="https://www.tiktok.com/@legalrecours"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://www.instagram.com/legalrecours"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                © 2025 LegalRecours.fr — Tous droits réservés | Expert en réclamations administratives
              </div>
            </div>
          </footer>
        </div>

        {/* Bandeau cookies (client) */}
        <CookieBanner />
      </body>
    </html>
  );
}
