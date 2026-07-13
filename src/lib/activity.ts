import { prisma } from "./db";

/**
 * Catat aktivitas ke log (Admin → Aktivitas). Sengaja tidak melempar error —
 * kegagalan mencatat log tidak boleh menggagalkan aksi utamanya.
 */
export async function logActivity(action: string, detail = ""): Promise<void> {
  try {
    await prisma.activityLog.create({ data: { action, detail } });
  } catch {
    // diabaikan — log bersifat pelengkap
  }
}
