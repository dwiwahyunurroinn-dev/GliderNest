import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/settings";

export function WhatsAppCta({
  whatsapp,
  message,
  label,
  variant = "primary",
  className = "",
}: {
  whatsapp: string;
  message: string;
  label: string;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all";
  const styles =
    variant === "primary"
      ? "bg-brand text-white shadow-sm hover:bg-brand-strong hover:shadow-md"
      : "border border-line bg-surface text-foreground hover:border-brand hover:text-brand-strong";
  return (
    <a
      href={waLink(whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  );
}
