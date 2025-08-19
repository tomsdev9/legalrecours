"use client";

export default function CookiePreferencesButton({
  className,
}: { className?: string }) {
  return (
    <button
      type="button"
      className={className ?? "underline underline-offset-2 hover:text-gray-900 transition-colors"}
      onClick={() =>
        window.dispatchEvent(new CustomEvent("open-cookie-preferences"))
      }
    >
      Gérer mes cookies
    </button>
  );
}
