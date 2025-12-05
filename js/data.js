/**
 * data.js - Month Configuration Data
 * Menggunakan gambar lokal dari folder /images/
 *
 * CARA MENAMBAHKAN FOTO BARU:
 * 1. Tambahkan file foto ke folder /images/[nama_bulan]/
 * 2. Tambahkan nama file ke array 'photos' pada bulan yang diinginkan
 */

const MONTHS_DATA = [
  {
    name: "Januari",
    shortName: "Jan",
    photos: [
      "images/januari/01.jpg",
      "images/januari/02.jpg",
      "images/januari/03.jpg",
      "images/januari/04.jpg",
      "images/januari/05.jpg",
    ],
    color: "#1a1a2e",
    accentColor: "#6366f1",
    description: "Awal tahun baru, semangat baru",
  },
  {
    name: "Februari",
    shortName: "Feb",
    photos: [
      "images/februari/01.jpg",
      "images/februari/02.jpg",
      "images/februari/03.jpg",
    ],
    color: "#2d1b2e",
    accentColor: "#ec4899",
    description: "Bulan kasih sayang",
  },
  {
    name: "Maret",
    shortName: "Mar",
    photos: [
      "images/maret/01.jpg",
      "images/maret/02.jpg",
      "images/maret/03.jpg",
      "images/maret/04.jpg",
    ],
    color: "#1b2e1f",
    accentColor: "#22c55e",
    description: "Musim semi tiba",
  },
  {
    name: "April",
    shortName: "Apr",
    photos: [
      "images/april/01.jpg",
      "images/april/02.jpg",
      "images/april/03.jpg",
      "images/april/04.jpg",
      "images/april/05.jpg",
      "images/april/06.jpg",
    ],
    color: "#1e2e1b",
    accentColor: "#84cc16",
    description: "Bunga bermekaran",
  },
  {
    name: "Mei",
    shortName: "Mei",
    photos: [
      "images/mei/01.jpg",
      "images/mei/02.jpg",
      "images/mei/03.jpg",
      "images/mei/04.jpg",
    ],
    color: "#1b2e2a",
    accentColor: "#14b8a6",
    description: "Petualangan alam",
  },
  {
    name: "Juni",
    shortName: "Jun",
    photos: ["images/juni/01.jpg", "images/juni/02.jpg", "images/juni/03.jpg"],
    color: "#1b252e",
    accentColor: "#0ea5e9",
    description: "Musim panas dimulai",
  },
  {
    name: "Juli",
    shortName: "Jul",
    photos: [
      "images/juli/01.jpg",
      "images/juli/02.jpg",
      "images/juli/03.jpg",
      "images/juli/04.jpg",
      "images/juli/05.jpg",
    ],
    color: "#1b1f2e",
    accentColor: "#3b82f6",
    description: "Liburan musim panas",
  },
  {
    name: "Agustus",
    shortName: "Agu",
    photos: [
      "images/agustus/01.jpg",
      "images/agustus/02.jpg",
      "images/agustus/03.jpg",
      "images/agustus/04.jpg",
    ],
    color: "#2e2a1b",
    accentColor: "#f59e0b",
    description: "Puncak musim panas",
  },
  {
    name: "September",
    shortName: "Sep",
    photos: [
      "images/september/01.jpg",
      "images/september/02.jpg",
      "images/september/03.jpg",
    ],
    color: "#2e251b",
    accentColor: "#ea580c",
    description: "Musim gugur tiba",
  },
  {
    name: "Oktober",
    shortName: "Okt",
    photos: [
      "images/oktober/01.jpg",
      "images/oktober/02.jpg",
      "images/oktober/03.jpg",
      "images/oktober/04.jpg",
      "images/oktober/05.jpg",
      "images/oktober/06.jpg",
    ],
    color: "#2e1f1b",
    accentColor: "#dc2626",
    description: "Daun berguguran",
  },
  {
    name: "November",
    shortName: "Nov",
    photos: [
      "images/november/01.jpg",
      "images/november/02.jpg",
      "images/november/03.jpg",
      "images/november/04.jpg",
    ],
    color: "#251b2e",
    accentColor: "#8b5cf6",
    description: "Menuju akhir tahun",
  },
  {
    name: "Desember",
    shortName: "Des",
    photos: [
      "images/desember/01.jpg",
      "images/desember/02.jpg",
      "images/desember/03.jpg",
      "images/desember/04.jpg",
      "images/desember/05.jpg",
    ],
    color: "#1b1f2e",
    accentColor: "#06b6d4",
    description: "Perayaan akhir tahun",
  },
];

// Export for use in other modules
window.MONTHS_DATA = MONTHS_DATA;
