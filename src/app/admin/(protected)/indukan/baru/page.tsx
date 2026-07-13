import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ParentForm } from "../ParentForm";
import { createParent } from "../actions";

export default function NewParentPage() {
  return (
    <div>
      <Link
        href="/admin/indukan"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-strong"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold">
        Tambah Indukan
      </h1>
      <ParentForm action={createParent} />
    </div>
  );
}
