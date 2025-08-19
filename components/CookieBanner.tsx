"use client";
import React, { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-v1";

type Prefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const defaultPrefs: Prefs = { necessary: true, analytics: false, marketing: false };

export default function CookieBanner() {
  const [open, setOpen] = useState(false);      // petite modale "Paramétrer"
  const [showBar, setShowBar] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);

  // Ouvrir les préférences depuis le footer (bouton "Gérer mes cookies")
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cookie-preferences", handler);
    return () => window.removeEventListener("open-cookie-preferences", handler);
  }, []);

  // Lecture du consentement existant
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw) as Prefs;
        setPrefs({ necessary: true, analytics: !!saved.analytics, marketing: !!saved.marketing });
        setShowBar(false);
        applyPrefs(saved);
        return;
      } catch {}
    }
    setShowBar(true);
  }, []);

  function save(p: Prefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    applyPrefs(p);
  }

  function applyPrefs(p: Prefs) {
    (window as unknown as Record<string, unknown>).__cookieConsent = p;

    // Exemple d’injection conditionnelle (à remplacer par votre outil : Matomo/GA)
    const hasAnalytics = document.querySelector("script[data-analytics]");
    if (p.analytics && !hasAnalytics) {
      const s = document.createElement("script");
      // s.src = "https://example.com/matomo.js"; // ← METS ton script si besoin
      s.defer = true;
      s.setAttribute("data-analytics", "1");
      document.head.appendChild(s);
    }
    if (!p.analytics && hasAnalytics) {
      hasAnalytics.remove();
    }
    // Idem pour marketing si tu utilises des tags pub (non inclus ici).
  }

  const acceptAll = () => {
    const p: Prefs = { necessary: true, analytics: true, marketing: true };
    setPrefs(p);
    save(p);
    setShowBar(false);
    setOpen(false);
  };

  const rejectAll = () => {
    const p: Prefs = { necessary: true, analytics: false, marketing: false };
    setPrefs(p);
    save(p);
    setShowBar(false);
    setOpen(false);
  };

  const saveChoices = () => {
    save(prefs);
    setShowBar(false);
    setOpen(false);
  };

  if (!showBar && !open) return null;

  return (
    <>
      {/* Barre compacte en bas */}
      {showBar && (
        <div
          className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2"
          role="region"
          aria-label="Information cookies"
        >
          <div className="glass-white max-w-[920px] w-[92vw] rounded-xl border p-3 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-700 sm:pr-3">
                On utilise des cookies nécessaires et, si tu es d’accord, des cookies pour la mesure d’audience.
              </p>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <button
                  className="rounded-lg border px-3 py-1.5 text-sm"
                  onClick={rejectAll}
                >
                  Refuser
                </button>
                <button
                  className="rounded-lg border px-3 py-1.5 text-sm"
                  onClick={() => setOpen(true)}
                >
                  Paramétrer
                </button>
                <button
                  className="rounded-lg px-3 py-1.5 text-sm text-white bg-green-primary"
                  onClick={acceptAll}
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini modale de préférences (très simple) */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-white p-4 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Paramètres des cookies"
          >
            <div className="mb-3 flex items-start justify-between">
              <h2 className="text-base font-semibold">Paramètres des cookies</h2>
              <button
                aria-label="Fermer"
                className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <PrefRow
                title="Nécessaires"
                desc="Indispensables au fonctionnement (toujours actifs)."
                checked
                disabled
                onChange={() => {}}
              />
              <PrefRow
                title="Mesure d’audience"
                desc="Aide à améliorer le site (ex : Matomo)."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((s) => ({ ...s, analytics: v }))}
              />
              <PrefRow
                title="Marketing"
                desc="Publicité personnalisée."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((s) => ({ ...s, marketing: v }))}
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button className="rounded-lg border px-3 py-1.5 text-sm" onClick={rejectAll}>
                Tout refuser
              </button>
              <button className="rounded-lg px-3 py-1.5 text-sm text-white bg-green-primary" onClick={saveChoices}>
                Enregistrer
              </button>
            </div>

            <p className="mt-3 text-xs text-muted">
              Plus d’infos :{" "}
              <a className="underline" href="/politique-de-confidentialite">
                Politique de confidentialité
              </a>
              .
            </p>
          </div>
        </>
      )}
    </>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted">{desc}</div>
      </div>
      <input
        type="checkbox"
        className="h-5 w-5"
        checked={!!checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}
