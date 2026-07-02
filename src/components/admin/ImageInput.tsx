"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ImagePlus, Crop, RefreshCw, X, ZoomIn } from "lucide-react";

/**
 * Input gambar dengan pratinjau + crop sebelum upload.
 *
 * Saat file dipilih, muncul bingkai sesuai rasio frame di halaman publik
 * (prop `aspect`, misal 4/3). Foto bisa digeser (drag) dan di-zoom (slider),
 * lalu "Terapkan" memotongnya lewat canvas dan hasil potongannya yang
 * dimasukkan ke input form (via DataTransfer) — jadi yang terunggah sudah
 * pas dengan frame. "Pakai Asli" melewati proses crop.
 */
export function ImageInput({
  id,
  name,
  required = false,
  aspect,
  previewHeight = "h-44",
}: {
  id: string;
  name: string;
  required?: boolean;
  /** rasio lebar/tinggi bingkai crop, mis. 4/3, 16/9, 1. Kosong = tanpa crop. */
  aspect?: number;
  previewHeight?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const [mode, setMode] = useState<"empty" | "crop" | "done">("empty");
  const [original, setOriginal] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [finalUrl, setFinalUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [natural, setNatural] = useState({ w: 1, h: 1 });
  const [frameSize, setFrameSize] = useState({ w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Ukur bingkai saat mode crop aktif & saat jendela berubah ukuran.
  useEffect(() => {
    if (mode !== "crop") return;
    const measure = () => {
      const el = frameRef.current;
      if (el) setFrameSize({ w: el.clientWidth, h: el.clientHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mode]);

  useEffect(() => {
    return () => {
      if (imgUrl) URL.revokeObjectURL(imgUrl);
      if (finalUrl) URL.revokeObjectURL(finalUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetUrls() {
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    if (finalUrl) URL.revokeObjectURL(finalUrl);
    setImgUrl(null);
    setFinalUrl(null);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    resetUrls();
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => setNatural({ w: im.naturalWidth, h: im.naturalHeight });
    im.src = url;
    setOriginal(file);
    setImgUrl(url);
    setFileName(file.name);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setMode(aspect ? "crop" : "done");
    if (!aspect) setFinalUrl(URL.createObjectURL(file));
  }

  function clearAll() {
    if (inputRef.current) inputRef.current.value = "";
    resetUrls();
    setOriginal(null);
    setFileName("");
    setMode("empty");
  }

  /** Geometri gambar di dalam bingkai (mode cover + zoom + offset). */
  function geometry() {
    const cw = frameSize.w;
    const ch = frameSize.h;
    if (!cw || !ch) return null;
    const base = Math.max(cw / natural.w, ch / natural.h);
    const scale = base * zoom;
    const dw = natural.w * scale;
    const dh = natural.h * scale;
    const maxX = Math.max(0, (dw - cw) / 2);
    const maxY = Math.max(0, (dh - ch) / 2);
    return { cw, ch, scale, dw, dh, maxX, maxY };
  }

  const geo = mode === "crop" ? geometry() : null;

  function clampOffset(x: number, y: number) {
    const g = geometry();
    if (!g) return { x, y };
    return {
      x: Math.min(g.maxX, Math.max(-g.maxX, x)),
      y: Math.min(g.maxY, Math.max(-g.maxY, y)),
    };
  }

  function onPointerDown(e: React.PointerEvent) {
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const d = dragRef.current;
    setOffset(clampOffset(d.ox + (e.clientX - d.x), d.oy + (e.clientY - d.y)));
  }
  function onPointerUp() {
    dragRef.current = null;
  }

  async function applyCrop() {
    const g = geometry();
    if (!g || !imgUrl || !original) return;
    // area gambar (piksel asli) yang terlihat di bingkai
    const lx = (g.cw - g.dw) / 2 + offset.x;
    const ly = (g.ch - g.dh) / 2 + offset.y;
    const sx = -lx / g.scale;
    const sy = -ly / g.scale;
    const sw = g.cw / g.scale;
    const sh = g.ch / g.scale;

    const im = new Image();
    await new Promise<void>((res, rej) => {
      im.onload = () => res();
      im.onerror = () => rej(new Error("gagal memuat gambar"));
      im.src = imgUrl;
    });

    // batasi resolusi keluaran agar file tetap ringan
    const outW = Math.round(Math.min(sw, 1920));
    const outH = Math.round(outW * (sh / sw));
    const canvas = document.createElement("canvas");
    canvas.width = outW;
    canvas.height = outH;
    canvas.getContext("2d")!.drawImage(im, sx, sy, sw, sh, 0, 0, outW, outH);

    const isPng = original.type === "image/png";
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, isPng ? "image/png" : "image/jpeg", 0.88)
    );
    if (!blob) return;

    const base = fileName.replace(/\.[^.]+$/, "");
    const cropped = new File([blob], `${base}-crop.${isPng ? "png" : "jpg"}`, {
      type: blob.type,
    });
    // masukkan hasil crop ke input form
    const dt = new DataTransfer();
    dt.items.add(cropped);
    if (inputRef.current) inputRef.current.files = dt.files;

    if (finalUrl) URL.revokeObjectURL(finalUrl);
    setFinalUrl(URL.createObjectURL(cropped));
    setMode("done");
  }

  function useOriginal() {
    if (finalUrl) URL.revokeObjectURL(finalUrl);
    setFinalUrl(original ? URL.createObjectURL(original) : null);
    // input masih memegang file asli — tidak perlu diubah
    setMode("done");
  }

  function recrop() {
    // kembalikan file asli ke input lalu buka lagi mode crop
    if (original && inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(original);
      inputRef.current.files = dt.files;
    }
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setMode("crop");
  }

  return (
    <div className="mt-1.5">
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept="image/*"
        required={required}
        onChange={handleChange}
        className="sr-only"
      />

      {mode === "empty" && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex ${previewHeight} w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-background text-muted transition-colors hover:border-brand hover:text-brand-strong`}
        >
          <ImagePlus className="h-7 w-7" />
          <span className="text-sm font-semibold">Pilih gambar</span>
          <span className="text-xs">
            {aspect ? "Setelah dipilih, atur posisi & crop sesuai frame" : "Pratinjau muncul di sini"}
          </span>
        </button>
      )}

      {mode === "crop" && imgUrl && (
        <div className="overflow-hidden rounded-2xl border border-line bg-background">
          <div
            ref={frameRef}
            className="relative w-full cursor-move touch-none select-none overflow-hidden bg-black/80"
            style={{ aspectRatio: String(aspect ?? 4 / 3) }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {geo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgUrl}
                alt="Atur posisi foto di dalam bingkai"
                draggable={false}
                className="pointer-events-none absolute left-1/2 top-1/2 max-w-none"
                style={{
                  width: geo.dw,
                  height: geo.dh,
                  transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                }}
              />
            )}
            {/* garis bantu rule-of-thirds */}
            <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-40">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-line px-4 py-3">
            <div className="flex items-center gap-3">
              <ZoomIn className="h-4 w-4 shrink-0 text-muted" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => {
                  setZoom(Number(e.target.value));
                  setOffset((o) => clampOffset(o.x, o.y));
                }}
                className="w-full accent-[var(--brand)]"
                aria-label="Zoom foto"
              />
            </div>
            <p className="text-xs text-muted">
              Geser foto untuk mengatur posisi · zoom dengan slider · bingkai ={" "}
              tampilan di website
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={applyCrop}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                <Check className="h-3.5 w-3.5" />
                Terapkan Crop
              </button>
              <button
                type="button"
                onClick={useOriginal}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-brand hover:text-brand-strong"
              >
                Pakai Asli (tanpa crop)
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/10"
              >
                <X className="h-3.5 w-3.5" />
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === "done" && finalUrl && (
        <div className="overflow-hidden rounded-2xl border border-line bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={finalUrl}
            alt="Pratinjau gambar yang akan diunggah"
            className={`${previewHeight} w-full object-contain`}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5">
            <span className="truncate text-xs font-medium text-muted">{fileName}</span>
            <span className="flex shrink-0 gap-1">
              {aspect && (
                <button
                  type="button"
                  onClick={recrop}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
                >
                  <Crop className="h-3.5 w-3.5" />
                  Crop Ulang
                </button>
              )}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-soft"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Ganti
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/10"
              >
                <X className="h-3.5 w-3.5" />
                Batal
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
