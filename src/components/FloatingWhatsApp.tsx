import { waLink } from "@/lib/settings";

function formatPhoneDisplay(whatsapp: string): string {
  // 6287734777846 -> 0877-3477-7846
  const local = whatsapp.replace(/^62/, "0");
  return local.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
}

/** Tombol WhatsApp melayang — contact person tampil di semua halaman. */
export function FloatingWhatsApp({
  whatsapp,
  siteName,
}: {
  whatsapp: string;
  siteName: string;
}) {
  return (
    <a
      href={waLink(whatsapp, `Halo ${siteName}, saya ingin bertanya.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Hubungi contact person via WhatsApp ${formatPhoneDisplay(whatsapp)}`}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-[#22a75d] py-3 pl-3.5 pr-4 text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-[#1d9152] hover:shadow-xl"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.1 14.1c-.2.6-1.2 1.1-1.7 1.2-.5 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c0 .2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.1 1c.3.1.5.2.6.4 0 .1 0 .7-.3 1.3Z" />
      </svg>
      <span className="hidden text-left sm:block">
        <span className="block text-[10px] font-medium uppercase tracking-wide text-white/80">
          Contact Person
        </span>
        <span className="block text-sm font-bold leading-tight">
          {formatPhoneDisplay(whatsapp)}
        </span>
      </span>
    </a>
  );
}
