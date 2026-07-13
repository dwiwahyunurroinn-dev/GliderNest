"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, createSession } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function login(formData: FormData): Promise<void> {
  // Anti brute-force: maksimal 5 percobaan login per 5 menit per IP.
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "tanpa-ip";
  if (!rateLimit(`login:${ip}`, 5, 5 * 60 * 1000)) {
    redirect("/admin/login?error=batas");
  }

  const password = String(formData.get("password") ?? "");
  if (!(await checkPassword(password))) {
    redirect("/admin/login?error=1");
  }
  await createSession();
  redirect("/admin");
}
