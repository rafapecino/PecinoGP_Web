"use client";

import { openCookiePreferences } from "@/All/components/cookie-consent";
import { Cookie } from "lucide-react";

export function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black uppercase italic text-xs tracking-widest transition-colors"
    >
      <Cookie size={16} />
      Gestionar mis cookies
    </button>
  );
}
