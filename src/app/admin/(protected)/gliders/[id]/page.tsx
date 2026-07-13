import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { GliderForm } from "../GliderForm";
import { updateGlider } from "../actions";
import { HealthBook } from "./HealthBook";

export const dynamic = "force-dynamic";

export default async function EditGliderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [glider, parents] = await Promise.all([
    prisma.glider.findUnique({
      where: { id },
      include: { healthRecords: true },
    }),
    prisma.parent.findMany({ orderBy: { name: "asc" } }),
  ]);
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
      <GliderForm glider={glider} parents={parents} action={updateGlider.bind(null, glider.id)} />
      <HealthBook gliderId={glider.id} records={glider.healthRecords} />
    </div>
  );
}
