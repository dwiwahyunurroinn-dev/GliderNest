import Link from "next/link";
import { BellRing, CheckCheck, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { btnOutline, btnPrimary } from "@/components/admin/ui";
import { deleteAllNotifications, markAllRead } from "./actions";

export const dynamic = "force-dynamic";

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "baru saja";
  if (s < 3600) return `${Math.floor(s / 60)} menit lalu`;
  if (s < 86400) return `${Math.floor(s / 3600)} jam lalu`;
  return `${Math.floor(s / 86400)} hari lalu`;
}

export default async function AdminNotificationsPage() {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Notifikasi
          </h1>
          <p className="mt-1 text-sm text-muted">
            Pesanan baru dan peringatan stok muncul di sini otomatis.
            {unread > 0 && ` ${unread} belum dibaca.`}
          </p>
        </div>
        <div className="flex gap-2">
          {unread > 0 && (
            <form action={markAllRead}>
              <button type="submit" className={btnPrimary}>
                <CheckCheck className="h-4 w-4" />
                Tandai Semua Dibaca
              </button>
            </form>
          )}
          {notifications.length > 0 && (
            <form action={deleteAllNotifications}>
              <button type="submit" className={btnOutline}>
                <Trash2 className="h-4 w-4" />
                Bersihkan
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        {notifications.map((n) => (
          <Link
            key={n.id}
            href={n.link || "/admin"}
            className={`flex items-start gap-4 rounded-3xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${
              n.read
                ? "border-line bg-surface opacity-70"
                : "border-brand/40 bg-brand-soft/50"
            }`}
          >
            <span
              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                n.read ? "bg-brand-soft text-muted" : "bg-brand text-white"
              }`}
            >
              <BellRing className="h-4.5 w-4.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline justify-between gap-2">
                <span className={`text-sm ${n.read ? "font-semibold" : "font-bold"}`}>
                  {n.title}
                </span>
                <span className="text-xs text-muted">{timeAgo(n.createdAt)}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{n.message}</span>
            </span>
          </Link>
        ))}
        {notifications.length === 0 && (
          <p className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted">
            Belum ada notifikasi.
          </p>
        )}
      </div>
    </div>
  );
}
