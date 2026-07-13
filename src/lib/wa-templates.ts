import type { Order } from "@/generated/prisma/client";
import { formatPrice } from "./format";

/** 08xxx → 62xxx (format wa.me). */
export function formatWaPhone(phone: string): string {
  return phone.replace(/\D/g, "").replace(/^0/, "62");
}

export interface WaTemplate {
  label: string;
  message: string;
}

/**
 * Template balas cepat per status pesanan — dipakai tombol WA di
 * halaman Admin → Pesanan. {siteName} diisi nama bisnis dari pengaturan.
 */
export function waTemplates(order: Order, siteName: string): WaTemplate[] {
  const sapa = `Halo kak ${order.customerName},`;
  const item = `${order.gliderName} (${order.code})`;
  const total = formatPrice(order.amount);

  switch (order.status) {
    case "menunggu":
      return [
        {
          label: "Tagih pembayaran",
          message: `${sapa} pesanan ${item} masih menunggu pembayaran sebesar ${total}. Instruksi pembayarannya bisa dibuka lagi di halaman pesanan ya kak. Ada yang bisa kami bantu? 🙏 — ${siteName}`,
        },
        {
          label: "Konfirmasi pembayaran diterima",
          message: `${sapa} pembayaran ${total} untuk pesanan ${item} sudah kami terima ✅ Pesanan langsung kami proses — jadwal pengiriman akan kami kabari segera. Terima kasih! — ${siteName}`,
        },
      ];
    case "diproses":
      return [
        {
          label: "Info jadwal kirim",
          message: `${sapa} kabar baik! Pesanan ${item} sedang kami siapkan. Rencana pengiriman akan kami informasikan — mohon pastikan nomor ini aktif ya kak. — ${siteName}`,
        },
        {
          label: "Minta konfirmasi alamat",
          message: `${sapa} sebelum joey kami kirim, mohon konfirmasi alamat penerima: "${order.address}". Sudah benar ya kak? — ${siteName}`,
        },
      ];
    case "dikirim":
      return [
        {
          label: "Info perjalanan",
          message: `${sapa} joey pesanan ${item} sudah dalam perjalanan 🚚 Kami pantau terus kondisinya. Mohon standby saat kurir tiba ya kak. — ${siteName}`,
        },
        {
          label: "Konfirmasi tiba",
          message: `${sapa} apakah joey pesanan ${item} sudah tiba dengan selamat? Mohon kabari kondisi si kecil ya kak 🙏 — ${siteName}`,
        },
      ];
    case "selesai":
      return [
        {
          label: "Terima kasih + minta testimoni",
          message: `${sapa} terima kasih sudah mengadopsi dari ${siteName} 💙 Jangan ragu konsultasi kapan pun di grup pendampingan. Kalau berkenan, boleh sekali kirim testimoni singkat pengalaman adopsinya — sangat membantu adopter lain 🙏`,
        },
      ];
    case "dibatalkan":
      return [
        {
          label: "Konfirmasi pembatalan",
          message: `${sapa} pesanan ${item} sudah kami batalkan sesuai permintaan. Kalau nanti berminat lagi, katalog kami selalu terbuka ya kak 😊 — ${siteName}`,
        },
      ];
    default:
      return [];
  }
}
