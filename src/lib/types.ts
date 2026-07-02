export type GliderStatus = "tersedia" | "dipesan" | "terjual";
export type GliderSex = "jantan" | "betina";

export interface Glider {
  slug: string;
  name: string;
  morph: string;
  sex: GliderSex;
  /** Umur dalam bulan saat listing dibuat */
  ageMonths: number;
  price: number;
  status: GliderStatus;
  description: string;
  lineage: string;
  /** Warna gradien kartu: [from, to] */
  palette: [string, string];
  traits: string[];
}

export interface Testimonial {
  name: string;
  city: string;
  quote: string;
}

export interface Faq {
  question: string;
  answer: string;
}
