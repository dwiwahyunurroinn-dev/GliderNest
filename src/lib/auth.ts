import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./db";

const COOKIE = "gn_admin";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "glidernest-dev-secret-ganti-di-produksi"
);

/** Hash password dengan scrypt (format simpan: salt:hash, hex). */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    timingSafeEqual(bb, bb); // durasi konsisten
    return false;
  }
  return timingSafeEqual(ab, bb);
}

/**
 * Urutan pengecekan password:
 * 1. hash di database (di-set lewat Admin → Pengaturan → Keamanan) — prioritas
 * 2. ADMIN_PASSWORD di .env
 * 3. password bawaan (hanya untuk pertama kali)
 */
export async function checkPassword(password: string): Promise<boolean> {
  const setting = await prisma.setting.findFirst({
    select: { adminPasswordHash: true },
  });
  if (setting?.adminPasswordHash) {
    if (verifyHash(password, setting.adminPasswordHash)) return true;
    // Jalur pemulihan jika lupa password: ADMIN_PASSWORD dari .env tetap
    // diterima — tapi hanya bila di-set eksplisit (bukan bawaan).
    if (process.env.ADMIN_PASSWORD) {
      return safeEqual(password, process.env.ADMIN_PASSWORD);
    }
    return false;
  }
  return safeEqual(password, process.env.ADMIN_PASSWORD ?? "glidernest123");
}

/** True jika password masih bawaan / kunci sesi belum di-set (untuk spanduk peringatan). */
export async function credentialWarnings(): Promise<{
  defaultPassword: boolean;
  missingAuthSecret: boolean;
}> {
  const setting = await prisma.setting.findFirst({
    select: { adminPasswordHash: true },
  });
  return {
    defaultPassword: !setting?.adminPasswordHash && !process.env.ADMIN_PASSWORD,
    missingAuthSecret: !process.env.AUTH_SECRET,
  };
}

export async function createSession(): Promise<void> {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<{ role: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    await jwtVerify(token, secret);
    return { role: "admin" };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function requireAdmin(): Promise<void> {
  if (!(await getSession())) redirect("/admin/login");
}
