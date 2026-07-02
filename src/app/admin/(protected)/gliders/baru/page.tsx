import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GliderForm } from "../GliderForm";
import { createGlider } from "../actions";

export default function NewGliderPage() {
  return (
    <div>
      <Link
        href="/admin/gliders"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-strong"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
        Tambah Sugar Glider
      </h1>
      <GliderForm action={createGlider} />
    </div>
  );
}
