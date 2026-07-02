"use client";

import { useState } from "react";
import { Printer, Download, Share2, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";

/**
 * Aksi invoice: cetak/PDF (desktop), unduh sebagai gambar PNG, dan bagikan
 * lewat menu bagikan bawaan HP (Web Share API) — cocok untuk pengguna mobile.
 */
export function InvoiceActions({ code }: { code: string }) {
  const [busy, setBusy] = useState<"download" | "share" | null>(null);

  async function capture(): Promise<string | null> {
    const el = document.getElementById("invoice-sheet");
    if (!el) return null;
    return toPng(el, {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });
  }

  async function handleDownload() {
    setBusy("download");
    try {
      const dataUrl = await capture();
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `invoice-${code}.png`;
      a.click();
    } catch {
      alert("Gagal membuat gambar invoice. Silakan coba lagi.");
    } finally {
      setBusy(null);
    }
  }

  async function handleShare() {
    setBusy("share");
    try {
      const dataUrl = await capture();
      if (!dataUrl) return;
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `invoice-${code}.png`, { type: "image/png" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `Invoice ${code}`,
          text: `Invoice pesanan ${code}`,
          files: [file],
        });
      } else {
        // Perangkat tanpa Web Share API: unduh saja gambarnya.
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `invoice-${code}.png`;
        a.click();
        alert("Perangkat ini tidak mendukung menu bagikan — invoice diunduh sebagai gambar.");
      }
    } catch (e) {
      // pengguna membatalkan dialog share → bukan error
      if (e instanceof Error && e.name !== "AbortError") {
        alert("Gagal membagikan invoice. Silakan coba unduh gambarnya.");
      }
    } finally {
      setBusy(null);
    }
  }

  const btn =
    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-60";

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <button
        type="button"
        onClick={handleDownload}
        disabled={busy !== null}
        className={`${btn} bg-brand text-white shadow-sm hover:bg-brand-strong`}
      >
        {busy === "download" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        Download Invoice
      </button>
      <button
        type="button"
        onClick={handleShare}
        disabled={busy !== null}
        className={`${btn} bg-[#22a75d] text-white shadow-sm hover:bg-[#1d9152]`}
      >
        {busy === "share" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Share2 className="h-4 w-4" />
        )}
        Bagikan
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className={`${btn} hidden border border-line bg-surface text-foreground hover:border-brand hover:text-brand-strong sm:inline-flex`}
      >
        <Printer className="h-4 w-4" />
        Cetak / PDF
      </button>
    </div>
  );
}
