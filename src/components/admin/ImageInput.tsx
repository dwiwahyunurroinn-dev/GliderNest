"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, RefreshCw, X } from "lucide-react";

/**
 * Input gambar dengan pratinjau langsung: begitu file dipilih, gambarnya
 * tampil dulu sehingga bisa dicek/diganti sebelum form dikirim.
 */
export function ImageInput({
  id,
  name,
  required = false,
  previewHeight = "h-44",
}: {
  id: string;
  name: string;
  required?: boolean;
  previewHeight?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    } else {
      setPreview(null);
      setFileName("");
    }
  }

  function clear() {
    if (inputRef.current) inputRef.current.value = "";
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName("");
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

      {preview ? (
        <div className="overflow-hidden rounded-2xl border border-line bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Pratinjau gambar yang akan diunggah"
            className={`${previewHeight} w-full object-contain`}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5">
            <span className="truncate text-xs font-medium text-muted">
              {fileName}
            </span>
            <span className="flex shrink-0 gap-1">
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
                onClick={clear}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/10"
              >
                <X className="h-3.5 w-3.5" />
                Batal
              </button>
            </span>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex ${previewHeight} w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-background text-muted transition-colors hover:border-brand hover:text-brand-strong`}
        >
          <ImagePlus className="h-7 w-7" />
          <span className="text-sm font-semibold">Pilih gambar</span>
          <span className="text-xs">Pratinjau muncul di sini sebelum diunggah</span>
        </button>
      )}
    </div>
  );
}
