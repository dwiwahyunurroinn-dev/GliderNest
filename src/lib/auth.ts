import { timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "gn_admin";
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "glidernest-dev-secret-ganti-di-produksi"
);

/** Perbandingan tahan timing-attack: durasinya sama benar maupun salah. */
export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "glidernest123";
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    // tetap lakukan perbandingan dummy agar durasi konsisten
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}

/** True jika masih memakai kredensial bawaan (peringatan di dashboard). */
export function usingDefaultCredentials(): boolean {
  return !process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET;
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
