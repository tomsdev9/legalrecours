// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";
import CookieBanner from "@/components/CookieBanner"; // bandeau cookies (client)
import CookiePreferencesButton from "@/components/CookiePreferencesButton"; // bouton (client)

const inter = Inter({ subsets: ["latin"] });

/** Logo texte SVG */
function LegalRecoursLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg
      className={className + " w-auto block"} // block pour supprimer l'espace inline
      viewBox="0 0 760 120"
      role="img"
      aria-label="LegalRecours"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50%"                // centré
        y="86"
        textAnchor="middle"    // centre l'ancrage
        fill="#222223"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        fontWeight="800"
        fontSize="78"
        letterSpacing="-1.5"
      >
        LegalRecours
      </text>
    </svg>
  );
}

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
              {/* TOP */}
              <div className="flex flex-col items-center gap-6 md:grid md:grid-cols-3 md:items-start">
                {/* Logo */}
                <div className="w-full">
                  <Link
                    href="/"
                    className="flex justify-center md:justify-start mx-auto md:mx-0"
                    aria-label="Accueil LegalRecours"
                  >
                    <LegalRecoursLogo className="h-8" />
                  </Link>
                </div>

                {/* Liens légaux */}
                <nav aria-label="Liens légaux" className="w-full">
                  <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                    <li>
                      <Link href="/conditions-utilisation" className="hover:text-gray-900 transition-colors">
                        Conditions d’utilisation
                      </Link>
                    </li>
                    <li>
                      <Link href="/politique-de-confidentialite" className="hover:text-gray-900 transition-colors">
                        Politique de confidentialité
                      </Link>
                    </li>
                    <li>
                      <Link href="/dpa" className="hover:text-gray-900 transition-colors">
                        DPA
                      </Link>
                    </li>
                    <li>
                      <a href="mailto:contact@legalrecours.fr" className="hover:text-gray-900 transition-colors">
                        Contact
                      </a>
                    </li>
                    <li>
                      {/* Composant client */}
                      <CookiePreferencesButton className="underline underline-offset-2 hover:text-gray-900 transition-colors" />
                    </li>
                  </ul>
                </nav>

                {/* Réseaux sociaux */}
                <div className="flex justify-center md:justify-end gap-6">
                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@legalrecours"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok LegalRecours"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6">
                      <path fill="#000" d="M128 0c70.7 0 128 57.3 128 128S198.7 256 128 256 0 198.7 0 128 57.3 0 128 0Z"/>
                      <path fill="#fff" d="M176.6 98.1c-7.6-5.2-13.7-12.5-16.5-21.4a41 41 0 0 1-1.1-8.3h-20.9v84.2c0 9.1-7.4 16.5-16.5 16.5-9.1 0-16.5-7.4-16.5-16.5 0-9.1 7.4-16.5 16.5-16.5 1.4 0 2.7.2 4 .5V121a38 38 0 0 0-4-.2c-21 0-38.1 17.1-38.1 38.1s17.1 38.1 38.1 38.1 38.1-17.1 38.1-38.1v-47a63.6 63.6 0 0 0 35 11.2v-20a44.3 44.3 0 0 1-18.6-5.2Z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/legalrecours"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram LegalRecours"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-6 h-6">
                      <defs>
                        <linearGradient id="IG" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f58529"/>
                          <stop offset="25%" stopColor="#feda77"/>
                          <stop offset="50%" stopColor="#dd2a7b"/>
                          <stop offset="75%" stopColor="#8134af"/>
                          <stop offset="100%" stopColor="#515bd4"/>
                        </linearGradient>
                      </defs>
                      <path fill="url(#IG)" d="M128 0c70.7 0 128 57.3 128 128S198.7 256 128 256 0 198.7 0 128 57.3 0 128 0Z"/>
                      <path fill="#fff" d="M170 76H86c-5.5 0-10 4.5-10 10v84c0 5.5 4.5 10 10 10h84c5.5 0 10-4.5 10-10V86c0-5.5-4.5-10-10-10Zm-42 95c-20.2 0-36.5-16.3-36.5-36.5S107.8 98 128 98s36.5 16.3 36.5 36.5S148.2 171 128 171Zm38.2-65.4c-4.5 0-8.2-3.6-8.2-8.1 0-4.5 3.7-8.1 8.2-8.1s8.2 3.6 8.2 8.1c0 4.5-3.7 8.1-8.2 8.1Z"/>
                      <circle fill="#fff" cx="128" cy="134.5" r="23.5"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* BOTTOM */}
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
