import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { ParentForm } from "../ParentForm";
import { updateParent } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditParentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parent = await prisma.parent.findUnique({ where: { id } });
  if (!parent) notFound();

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
        Edit Indukan: {parent.name}
      </h1>
      <ParentForm parent={parent} action={updateParent.bind(null, parent.id)} />
    </div>
  );
}
