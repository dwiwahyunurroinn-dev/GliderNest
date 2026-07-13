import Link from "next/link";
import {
  AlarmClock,
  Truck,
  PackageCheck,
  MessageCircle,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { followupCutoff, formatPrice } from "@/lib/format";
import { formatWaPhone, waTemplates } from "@/lib/wa-templates";
import { updateOrderStatus } from "../pesanan/actions";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const [settings, tagih, kirim, perjalanan] = await Promise.all([
    getSettings(),
    prisma.order.findMany({
      where: { status: "menunggu", createdAt: { lt: followupCutoff() } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.order.findMany({
      where: { status: "diproses" },
      orderBy: { createdAt: "asc" },
    }),
    prisma.order.findMany({
      where: { status: "dikirim" },
      orderBy: { updatedAt: "asc" },
    }),
  ]);

  const totalTugas = tagih.length + kirim.length + perjalanan.length;

  const sections = [
    {
      icon: AlarmClock,
      title: "Follow-up pembayaran",
      subtitle: "Menunggu pembayaran lebih dari 24 jam — tagih dengan sopan",
      tint: "bg-red-500/10 text-red-500",
      orders: tagih,
      doneLabel: null,
      doneStatus: null,
    },
    {
      icon: Truck,
      title: "Kirim hari ini",
      subtitle: "Sudah dibayar & sedang disiapkan — atur pengiriman",
      tint: "bg-amber-500/15 text-amber-600",
      orders: kirim,
      doneLabel: "Tandai Dikirim",
      doneStatus: "dikirim",
    },
    {
      icon: PackageCheck,
      title: "Dalam perjalanan",
      subtitle: "Pantau sampai tiba, lalu tandai selesai",
      tint: "bg-brand-soft text-brand-strong",
      orders: perjalanan,
      doneLabel: "Tandai Selesai",
      doneStatus: "selesai",
    },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Hari Ini
      </h1>
      <p className="mt-1 text-sm text-muted">
        Daftar tugas operasional harian Anda — semua yang perlu ditindak,
        dalam satu layar.
      </p>

      {totalTugas === 0 ? (
        <div className="mt-8 rounded-3xl border border-line bg-surface p-12 text-center shadow-sm">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
          <p className="mt-4 text-lg font-bold">Semua beres! 🎉</p>
          <p className="mt-1 text-sm text-muted">
            Tidak ada pesanan yang perlu ditindak hari ini.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {sections.map(
            (sec) =>
              sec.orders.length > 0 && (
                <section
                  key={sec.title}
                  className="rounded-3xl border border-line bg-surface shadow-sm"
                >
                  <div className="flex items-center gap-3 border-b border-line px-6 py-4">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${sec.tint}`}>
                      <sec.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-semibold">
                        {sec.title}{" "}
                        <span className="ml-1 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand-strong">
                          {sec.orders.length}
                        </span>
                      </h2>
                      <p className="text-xs text-muted">{sec.subtitle}</p>
                    </div>
                  </div>
                  <ul className="divide-y divide-line/70">
                    {sec.orders.map((o) => {
                      const wa = waTemplates(o, settings.siteName)[0];
                      return (
                        <li
                          key={o.id}
                          className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold">
                              <span className="font-mono text-brand-strong">{o.code}</span>{" "}
                              · {o.customerName} — {o.gliderName}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                              <MapPin className="h-3 w-3 shrink-0" />
                              <span className="truncate">{o.address}</span>
                              <span className="shrink-0 font-semibold text-brand-strong">
                                {formatPrice(o.amount)}
                              </span>
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            {wa && (
                              <a
                                href={`https://wa.me/${formatWaPhone(o.phone)}?text=${encodeURIComponent(wa.message)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#22a75d]/10 px-3.5 py-2 text-xs font-semibold text-[#178a4c] transition-colors hover:bg-[#22a75d] hover:text-white"
                              >
                                <MessageCircle className="h-3.5 w-3.5" />
                                {wa.label}
                              </a>
                            )}
                            {sec.doneStatus && (
                              <form action={updateOrderStatus.bind(null, o.id)}>
                                <input type="hidden" name="status" value={sec.doneStatus} />
                                <button
                                  type="submit"
                                  className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  {sec.doneLabel}
                                </button>
                              </form>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )
          )}
          <p className="text-xs text-muted">
            Detail lengkap tiap pesanan ada di{" "}
            <Link href="/admin/pesanan" className="font-semibold text-brand hover:text-brand-strong">
              menu Pesanan
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
