"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translations - Personal Memories Theme (Non-romantic)
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero
    "hero.title": "Journey Of The Year",
    "hero.subtitle": "A collection of memories throughout 2025 ✨",
    "hero.scroll": "scroll down",

    // Music modal
    "music.title": "Play Music?",
    "music.description":
      "Would you like to play background music on this website?",
    "music.hint": "Music will make the experience more memorable ✨",
    "music.yes": "Yes, Play! 🎵",
    "music.no": "No, Thanks",

    // Footer
    "footer.title": "Thank You For The Memories ✨",
    "footer.subtitle": "Journey Of The Year 2025 — Edo Priyatna (Douzxy)",
    "footer.quote": '"Every moment is a story worth keeping" 📸',

    // Month notes - Personal memories theme
    "note.january":
      "New year, new adventures begin! Fresh start, fresh energy 🚀",
    "note.february": "Building momentum, chasing goals 🎯 Let's go!",
    "note.march": "Spring vibes, new opportunities blooming 🌿",
    "note.april": "Rain or shine, keep moving forward 🌈",
    "note.may": "Every moment counts, making memories 📸",
    "note.june": "Summer energy, time for adventures 🔥",
    "note.july": "Celebrating life and achievements 🎉",
    "note.august": "Chasing sunsets and dreams 🌅",
    "note.september": "Autumn season, time for reflection 🍂",
    "note.october": "Every day is an adventure 🎃",
    "note.november": "Grateful for all the experiences 🙏",
    "note.december": "A year full of growth and memories! 🎄 What a journey!",

    // Photo captions - Non-romantic
    "caption.jan1": "Starting the journey ⭐",
    "caption.jan2": "First moments of the year",
    "caption.jan3": "Fresh start vibes",
    "caption.feb1": "February adventures 🔥",
    "caption.feb2": "Making progress",
    "caption.feb3": "Good times",
    "caption.feb4": "Great memories",
    "caption.mar1": "Spring energy 🌿",
    "caption.mar2": "Exploring around",
    "caption.mar3": "Nature vibes",
    "caption.apr1": "Rainy day vibes ☔",
    "caption.apr2": "Staying productive",
    "caption.apr3": "Cozy moments",
    "caption.apr4": "April adventures",
    "caption.may1": "Good times 🧁",
    "caption.may2": "Quality moments",
    "caption.may3": "Evening chill",
    "caption.jun1": "Summer vibes ☀️",
    "caption.jun2": "Beach day",
    "caption.jun3": "Sunset views",
    "caption.jun4": "Summer adventures",
    "caption.jul1": "Mid-year celebration 🎉",
    "caption.jul2": "Nice dinner",
    "caption.jul3": "Treats for self",
    "caption.aug1": "Vacation time 🏝️",
    "caption.aug2": "Travel memories",
    "caption.aug3": "Exploring new places",
    "caption.aug4": "Great memories",
    "caption.sep1": "Autumn vibes 🍂",
    "caption.sep2": "Cozy season",
    "caption.sep3": "Fall colors",
    "caption.oct1": "Halloween ready 🎃",
    "caption.oct2": "Fun times",
    "caption.oct3": "Night out",
    "caption.oct4": "Spooky season",
    "caption.nov1": "Grateful season 🙏",
    "caption.nov2": "Warm moments",
    "caption.nov3": "Cozy vibes",
    "caption.dec1": "Holiday season 🎄",
    "caption.dec2": "Best gift ever",
    "caption.dec3": "Winter vibes",
    "caption.dec4": "Year-end memories",
  },
  id: {
    // Hero
    "hero.title": "Journey Of The Year",
    "hero.subtitle": "Kumpulan kenangan sepanjang tahun 2025 ✨",
    "hero.scroll": "scroll down",

    // Music modal
    "music.title": "Putar Musik?",
    "music.description": "Apakah kamu ingin memutar musik di website ini?",
    "music.hint": "Musik akan membuat pengalaman lebih berkesan ✨",
    "music.yes": "Yes, Play! 🎵",
    "music.no": "No, Thanks",

    // Footer
    "footer.title": "Terima Kasih Untuk Semua Kenangan ✨",
    "footer.subtitle": "Journey Of The Year 2025 — Edo Priyatna (Douzxy)",
    "footer.quote": '"Setiap momen adalah cerita yang layak dikenang" 📸',

    // Month notes - Personal memories theme
    "note.january": "Tahun baru, petualangan baru dimulai! Semangat baru 🚀",
    "note.february": "Membangun momentum, mengejar goals 🎯 Gas!",
    "note.march": "Musim semi, peluang baru bermunculan 🌿",
    "note.april": "Hujan atau cerah, terus maju ke depan 🌈",
    "note.may": "Setiap momen berharga, membuat kenangan 📸",
    "note.june": "Energi musim panas, waktunya petualangan 🔥",
    "note.july": "Merayakan hidup dan pencapaian 🎉",
    "note.august": "Mengejar sunset dan mimpi-mimpi 🌅",
    "note.september": "Musim gugur, waktu untuk refleksi 🍂",
    "note.october": "Setiap hari adalah petualangan 🎃",
    "note.november": "Bersyukur untuk semua pengalaman 🙏",
    "note.december":
      "Setahun penuh pertumbuhan dan kenangan! 🎄 Perjalanan yang luar biasa!",

    // Photo captions - Non-romantic
    "caption.jan1": "Memulai perjalanan ⭐",
    "caption.jan2": "Momen pertama tahun ini",
    "caption.jan3": "Fresh start vibes",
    "caption.feb1": "Petualangan Februari 🔥",
    "caption.feb2": "Making progress",
    "caption.feb3": "Good times",
    "caption.feb4": "Kenangan seru",
    "caption.mar1": "Energi musim semi 🌿",
    "caption.mar2": "Jalan-jalan",
    "caption.mar3": "Suasana alam",
    "caption.apr1": "Vibes hujan ☔",
    "caption.apr2": "Tetap produktif",
    "caption.apr3": "Momen santai",
    "caption.apr4": "Petualangan April",
    "caption.may1": "Good times 🧁",
    "caption.may2": "Quality moments",
    "caption.may3": "Sore santai",
    "caption.jun1": "Summer vibes ☀️",
    "caption.jun2": "Hari di pantai",
    "caption.jun3": "Sunset views",
    "caption.jun4": "Petualangan musim panas",
    "caption.jul1": "Perayaan tengah tahun 🎉",
    "caption.jul2": "Dinner enak",
    "caption.jul3": "Self treat",
    "caption.aug1": "Waktunya liburan 🏝️",
    "caption.aug2": "Travel memories",
    "caption.aug3": "Explore tempat baru",
    "caption.aug4": "Kenangan indah",
    "caption.sep1": "Autumn vibes 🍂",
    "caption.sep2": "Musim cozy",
    "caption.sep3": "Warna musim gugur",
    "caption.oct1": "Siap Halloween 🎃",
    "caption.oct2": "Seru-seruan",
    "caption.oct3": "Night out",
    "caption.oct4": "Spooky season",
    "caption.nov1": "Musim bersyukur 🙏",
    "caption.nov2": "Momen hangat",
    "caption.nov3": "Vibes cozy",
    "caption.dec1": "Musim liburan 🎄",
    "caption.dec2": "Hadiah terbaik",
    "caption.dec3": "Winter vibes",
    "caption.dec4": "Kenangan akhir tahun",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANG_STORAGE_KEY = "preferredLanguage";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en"); // Default English
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;
    if (saved && (saved === "en" || saved === "id")) {
      setLanguageState(saved);
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
