/**
 * Pembatas laju sederhana di memori (sliding window) — mencegah spam form.
 * Cukup untuk satu instance server; saat pindah ke serverless multi-instance,
 * ganti dengan penyimpanan bersama (Redis/Upstash).
 */
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= limit) {
    hits.set(key, list);
    return false; // melebihi batas
  }
  list.push(now);
  hits.set(key, list);
  // bersihkan entri usang agar memori tidak menumpuk
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}
