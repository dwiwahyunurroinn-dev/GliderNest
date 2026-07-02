import type { Glider } from "@/generated/prisma/client";
import { inputCls, labelCls, btnPrimary } from "@/components/admin/ui";

export function GliderForm({
  glider,
  action,
}: {
  glider?: Glider;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form
      action={action}
      className="mt-6 space-y-5 rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Nama</label>
          <input id="name" name="name" required defaultValue={glider?.name} className={inputCls} />
        </div>
        <div>
          <label htmlFor="morph" className={labelCls}>Morph</label>
          <input
            id="morph"
            name="morph"
            required
            defaultValue={glider?.morph}
            placeholder="Classic Grey, Leucistic, ..."
            className={inputCls}
            list="morph-list"
          />
          <datalist id="morph-list">
            <option value="Classic Grey" />
            <option value="White Face Blond" />
            <option value="Mosaic" />
            <option value="Leucistic" />
            <option value="Platinum" />
            <option value="Cremeino" />
          </datalist>
        </div>
        <div>
          <label htmlFor="sex" className={labelCls}>Jenis kelamin</label>
          <select id="sex" name="sex" defaultValue={glider?.sex ?? "jantan"} className={inputCls}>
            <option value="jantan">Jantan</option>
            <option value="betina">Betina</option>
          </select>
        </div>
        <div>
          <label htmlFor="ageMonths" className={labelCls}>Umur (bulan OOP)</label>
          <input
            id="ageMonths"
            name="ageMonths"
            type="number"
            min={0}
            required
            defaultValue={glider?.ageMonths}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="price" className={labelCls}>Harga (Rp)</label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            required
            defaultValue={glider?.price}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="status" className={labelCls}>Status</label>
          <select id="status" name="status" defaultValue={glider?.status ?? "tersedia"} className={inputCls}>
            <option value="tersedia">Tersedia</option>
            <option value="dipesan">Dipesan</option>
            <option value="terjual">Terjual</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelCls}>Deskripsi</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={glider?.description}
          className={inputCls}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lineage" className={labelCls}>Silsilah</label>
          <input
            id="lineage"
            name="lineage"
            defaultValue={glider?.lineage}
            placeholder="Indukan A x Indukan B"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="traits" className={labelCls}>
            Keunggulan <span className="font-normal text-muted">(pisahkan dengan koma)</span>
          </label>
          <input
            id="traits"
            name="traits"
            defaultValue={glider?.traits}
            placeholder="Mudah bonding, Kenal nama"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className={labelCls}>
          Foto{" "}
          <span className="font-normal text-muted">
            {glider?.imageUrl ? "(kosongkan jika tidak ingin mengganti)" : "(opsional)"}
          </span>
        </label>
        <input id="image" name="image" type="file" accept="image/*" className={inputCls} />
        {glider?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={glider.imageUrl}
            alt={glider.name}
            className="mt-3 h-28 w-28 rounded-2xl border border-line object-cover"
          />
        )}
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={glider?.featured}
          className="h-4 w-4 accent-[var(--brand)]"
        />
        Tampilkan sebagai unggulan di beranda
      </label>

      <button type="submit" className={btnPrimary}>
        {glider ? "Simpan Perubahan" : "Tambah Glider"}
      </button>
    </form>
  );
}
