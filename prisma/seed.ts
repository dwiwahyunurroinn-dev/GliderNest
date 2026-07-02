import path from "node:path";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: `file:${path.join(process.cwd(), "prisma", "dev.db")}`,
  }),
});

const gliders = [
  {
    slug: "luna-white-face-blond",
    name: "Luna",
    morph: "White Face Blond",
    sex: "betina",
    ageMonths: 3,
    price: 1500000,
    status: "tersedia",
    featured: true,
    description:
      "Luna adalah joey betina White Face Blond yang aktif dan mudah bonding. Sudah terbiasa handling harian sejak out of pouch, makan lahap, dan sangat responsif terhadap suara pemiliknya.",
    lineage: "Indukan WFB x Classic Grey, garis keturunan 3 generasi tercatat",
    traits: "Mudah bonding, Handling harian, Nafsu makan baik",
  },
  {
    slug: "arto-classic-grey",
    name: "Arto",
    morph: "Classic Grey",
    sex: "jantan",
    ageMonths: 4,
    price: 850000,
    status: "tersedia",
    featured: true,
    description:
      "Arto adalah jantan Classic Grey dengan garis punggung tegas dan tubuh proporsional. Cocok untuk pemula karena karakternya tenang dan tidak mudah crabbing.",
    lineage: "Indukan Classic Grey lokal, sehat 2 generasi",
    traits: "Karakter tenang, Cocok pemula, Postur bagus",
  },
  {
    slug: "salju-leucistic",
    name: "Salju",
    morph: "Leucistic",
    sex: "betina",
    ageMonths: 3,
    price: 4500000,
    status: "tersedia",
    featured: true,
    description:
      "Salju adalah betina Leucistic putih bersih bermata hitam. Morph langka dengan kualitas breeding, cocok untuk hobiis serius maupun calon breeder.",
    lineage: "Kedua indukan het Leucistic, silsilah 4 generasi tercatat",
    traits: "Morph langka, Kualitas breeding, Silsilah lengkap",
  },
  {
    slug: "mozaik-mosaic",
    name: "Mozaik",
    morph: "Mosaic",
    sex: "jantan",
    ageMonths: 5,
    price: 3000000,
    status: "dipesan",
    featured: false,
    description:
      "Mozaik memiliki pola putih unik di sekujur tubuh — tiap Mosaic polanya satu-satunya di dunia. Jinak, terbiasa bonding pouch, dan sudah kenal nama.",
    lineage: "Indukan Mosaic x White Face Blond",
    traits: "Pola unik, Kenal nama, Bonding pouch",
  },
  {
    slug: "embun-platinum",
    name: "Embun",
    morph: "Platinum",
    sex: "betina",
    ageMonths: 4,
    price: 5500000,
    status: "tersedia",
    featured: false,
    description:
      "Embun adalah betina Platinum berbulu perak lembut dengan garis punggung tipis. Salah satu morph paling dicari, dari pasangan indukan bersertifikat sehat.",
    lineage: "Indukan Platinum x Leucistic het, silsilah 4 generasi",
    traits: "Morph premium, Bulu perak, Indukan tersertifikasi",
  },
  {
    slug: "kirana-cremeino",
    name: "Kirana",
    morph: "Cremeino",
    sex: "betina",
    ageMonths: 3,
    price: 4000000,
    status: "terjual",
    featured: false,
    description:
      "Kirana adalah betina Cremeino berbulu krem hangat dengan mata ruby. Sudah diadopsi keluarga di Bandung — pantau katalog untuk joey Cremeino berikutnya.",
    lineage: "Indukan Cremeino x Classic het Cremeino",
    traits: "Mata ruby, Bulu krem, Sudah diadopsi",
  },
];

const articles = [
  {
    slug: "panduan-lengkap-merawat-sugar-glider-pemula",
    title: "Panduan Lengkap Merawat Sugar Glider untuk Pemula",
    excerpt:
      "Semua yang perlu Anda siapkan sebelum joey pertama tiba di rumah: kandang, pakan, suhu ruangan, dan kesalahan umum yang wajib dihindari.",
    content: `Sugar glider adalah hewan nokturnal asal keluarga marsupial yang bisa hidup 10–15 tahun. Artinya, memelihara glider adalah komitmen jangka panjang — bukan tren sesaat. Sebelum joey pertama tiba, pastikan kandang minimal berukuran 60×60×90 cm untuk sepasang, ditempatkan di ruangan bersuhu 24–28°C, jauh dari AC langsung dan asap dapur.

Pakan adalah kunci kesehatan glider. Basis diet yang kami rekomendasikan adalah bubur HPW atau BML termodifikasi, ditambah buah dan sayur segar bergantian seperti pepaya, apel tanpa biji, dan jagung manis. Protein serangga (jangkrik atau ulat hongkong) cukup 2–3 kali seminggu. Hindari cokelat, bawang, kafein, dan makanan berbumbu — semuanya beracun bagi glider.

Kesalahan pemula yang paling sering kami temui: membeli joey terlalu muda (di bawah 2,5 bulan out of pouch), memberi pakan hanya buah manis, dan memelihara satu ekor tanpa interaksi. Glider adalah hewan koloni; idealnya dipelihara berpasangan agar tidak stres. Jika Anda ragu, konsultasikan dulu dengan kami — gratis, bahkan jika glider Anda bukan dari GliderNest.`,
  },
  {
    slug: "mengenal-morph-sugar-glider-dan-harganya",
    title: "Mengenal Morph Sugar Glider: Dari Classic Grey sampai Platinum",
    excerpt:
      "Apa bedanya Classic Grey, White Face Blond, Mosaic, Leucistic, dan Platinum? Kenali karakteristik tiap morph dan kisaran harganya di pasar Indonesia.",
    content: `Morph adalah variasi warna dan pola genetik pada sugar glider. Classic Grey adalah morph alami — abu-abu dengan garis punggung hitam — dan pilihan terbaik untuk pemula karena harganya paling terjangkau dan genetiknya paling kuat.

White Face Blond (WFB) memiliki wajah bersih tanpa garis hitam di bawah telinga, memberi kesan lebih "ramah". Mosaic punya pola putih acak yang unik di tiap individu — tidak ada dua Mosaic yang sama. Keduanya berada di kelas harga menengah.

Di kelas premium ada Leucistic (putih bersih bermata hitam), Cremeino (krem hangat bermata ruby), dan Platinum (perak lembut dengan garis tipis). Morph ini lahir dari perhitungan genetik lintas generasi, sehingga harganya mencerminkan kualitas silsilah indukannya. Di GliderNest, setiap joey premium disertai catatan silsilah 3–4 generasi yang bisa Anda verifikasi.`,
  },
  {
    slug: "tips-bonding-sugar-glider-agar-cepat-jinak",
    title: "Tips Bonding: Membuat Sugar Glider Jinak dan Lengket dengan Anda",
    excerpt:
      "Bonding adalah proses membangun kepercayaan antara Anda dan glider. Ikuti tahapan minggu demi minggu ini agar glider cepat mengenali Anda.",
    content: `Minggu pertama adalah masa adaptasi. Biarkan glider mengenal lingkungan barunya — jangan langsung dipaksa dipegang. Dekati kandang sambil berbicara lembut agar ia hafal suara Anda. Letakkan potongan kain yang sudah Anda pakai ke dalam kandang supaya ia terbiasa dengan aroma Anda.

Masuk minggu kedua, mulai gunakan bonding pouch — kantong kain yang dibawa beraktivitas 1–2 jam sehari. Glider yang tidur di pouch sambil mencium aroma Anda akan mengasosiasikan Anda dengan rasa aman. Berikan treat dari tangan, misalnya ulat hongkong, untuk memperkuat asosiasi positif.

Konsistensi adalah segalanya. Bonding yang baik butuh 2–6 minggu tergantung karakter glider dan usianya — makin muda joey, makin cepat prosesnya. Semua joey GliderNest sudah menjalani handling harian sejak out of pouch, jadi proses bonding di rumah baru biasanya jauh lebih singkat.`,
  },
];

const testimonials = [
  {
    name: "Rani P.",
    city: "Jakarta",
    quote:
      "Joey dari GliderNest datang sehat, jinak, dan dokumennya lengkap. Yang paling berkesan: setelah adopsi tetap dibimbing sampai gliderku bonding penuh.",
  },
  {
    name: "Dimas A.",
    city: "Surabaya",
    quote:
      "Sebagai pemula saya banyak dibantu memilih glider yang cocok. Tidak dipaksa beli yang mahal — malah disarankan mulai dari Classic Grey. Jujur dan edukatif.",
  },
  {
    name: "Sinta W.",
    city: "Bandung",
    quote:
      "Pengiriman rapi dan aman, glider tiba dalam kondisi prima. Grup pendampingan pasca-adopsinya sangat membantu untuk konsultasi harian.",
  },
  {
    name: "Yoga H.",
    city: "Semarang",
    quote:
      "Reseller di sini enak banget sistemnya. Stok selalu dikabari duluan, margin jelas, dan edukasi ke pembeli akhir dibantu tim GliderNest.",
  },
];

const gallery = [
  { title: "Joey White Face Blond usia 2 bulan", imageUrl: "/gallery/gallery-1.svg" },
  { title: "Suasana kandang koloni indukan", imageUrl: "/gallery/gallery-2.svg" },
  { title: "Sesi bonding pouch sore hari", imageUrl: "/gallery/gallery-3.svg" },
  { title: "Persiapan pakan HPW harian", imageUrl: "/gallery/gallery-4.svg" },
];

async function main() {
  await prisma.setting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description:
        "GliderNest adalah peternakan sugar glider captive-bred yang mengutamakan kesehatan, silsilah jelas, dan edukasi perawatan.",
      bankAccounts: "BCA|1234567890|GliderNest\nBRI|098765432100|GliderNest",
      danaNumber: "081234567890",
      danaName: "GliderNest",
    },
  });

  for (const g of gliders) {
    await prisma.glider.upsert({ where: { slug: g.slug }, update: {}, create: g });
  }
  for (const a of articles) {
    await prisma.article.upsert({ where: { slug: a.slug }, update: {}, create: a });
  }
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({ data: testimonials });
  }
  if ((await prisma.galleryItem.count()) === 0) {
    await prisma.galleryItem.createMany({ data: gallery });
  }
  console.log("Seed selesai: data contoh sudah masuk ke database.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
