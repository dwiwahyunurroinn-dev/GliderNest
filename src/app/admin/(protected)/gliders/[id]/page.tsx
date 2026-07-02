import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { GliderForm } from "../GliderForm";
import { updateGlider } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditGliderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const glider = await prisma.glider.findUnique({ where: { id } });
  if (!glider) notFound();

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
        Edit: {glider.name}
      </h1>
      <GliderForm glider={glider} action={updateGlider.bind(null, glider.id)} />
    </div>
  );
}
