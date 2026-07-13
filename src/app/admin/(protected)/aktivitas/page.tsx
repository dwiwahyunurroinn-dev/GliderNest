import { History, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { btnOutline } from "@/components/admin/ui";
import { clearActivityLog } from "./actions";

export const dynamic = "force-dynamic";

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function AdminActivityPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            Log Aktivitas
          </h1>
          <p className="mt-1 text-sm text-muted">
            Jejak otomatis semua perubahan penting — pesanan, stok, konten, dan
            pengaturan. Menampilkan 200 aktivitas terakhir.
          </p>
        </div>
        {logs.length > 0 && (
          <form action={clearActivityLog}>
            <button type="submit" className={btnOutline}>
              <Trash2 className="h-4 w-4" />
              Bersihkan Log
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
        {logs.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted">
            Belum ada aktivitas tercatat.
          </p>
        ) : (
          <ul className="divide-y divide-line/70">
            {logs.map((log) => (
              <li key={log.id} className="flex items-start gap-3.5 px-5 py-3.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <History className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{log.action}</p>
                  {log.detail && (
                    <p className="truncate text-xs text-muted">{log.detail}</p>
                  )}
                </div>
                <span className="shrink-0 text-xs font-medium text-muted">
                  {formatTime(log.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
