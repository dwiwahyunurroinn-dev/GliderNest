import type { Parent } from "@/generated/prisma/client";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/ImageInput";

export function ParentForm({
  parent,
  action,
}: {
  parent?: Parent;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      className="mt-6 space-y-5 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Nama indukan</label>
          <input id="name" name="name" required defaultValue={parent?.name} className={inputCls} />
        </div>
        <div>
          <label htmlFor="morph" className={labelCls}>Morph</label>
          <input
            id="morph"
            name="morph"
            required
            defaultValue={parent?.morph}
            placeholder="Classic Grey, Leucistic, ..."
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="sex" className={labelCls}>Jenis kelamin</label>
          <select id="sex" name="sex" defaultValue={parent?.sex ?? "jantan"} className={inputCls}>
            <option value="jantan">Jantan (sire)</option>
            <option value="betina">Betina (dam)</option>
          </select>
        </div>
        <div>
          <label htmlFor="birthYear" className={labelCls}>
            Tahun lahir <span className="font-normal text-muted">(opsional)</span>
          </label>
          <input
            id="birthYear"
            name="birthYear"
            type="number"
            min={2000}
            max={2100}
            defaultValue={parent?.birthYear || undefined}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelCls}>
          Catatan <span className="font-normal text-muted">(genetik het, asal, prestasi breeding, dll.)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} defaultValue={parent?.notes} className={inputCls} />
      </div>

      <div>
        <label htmlFor="image" className={labelCls}>
          Foto{" "}
          <span className="font-normal text-muted">
            {parent?.imageUrl ? "(kosongkan jika tidak ingin mengganti)" : "(opsional)"}
          </span>
        </label>
        <ImageInput id="image" name="image" aspect={1} previewHeight="h-40" />
        {parent?.imageUrl && (
          <div className="mt-3 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={parent.imageUrl}
              alt={parent.name}
              className="h-16 w-16 rounded-2xl border border-line object-cover"
            />
            <span className="text-xs text-muted">Foto saat ini</span>
          </div>
        )}
      </div>

      <button type="submit" className={btnPrimary}>
        {parent ? "Simpan Perubahan" : "Tambah Indukan"}
      </button>
    </form>
  );
}
