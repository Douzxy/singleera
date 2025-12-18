"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import MonthSection from "@/components/MonthSection";
import GlitterEffect from "@/components/scrapbook/GlitterEffect";
import FloatingDecorations from "@/components/scrapbook/FloatingDecorations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Month data with translation keys
const monthsData = [
  {
    name: "January",
    noteKey: "note.january",
    captionKeys: ["caption.jan1", "caption.jan2", "caption.jan3"],
    color: "#C06E52", // Rust
  },
  {
    name: "February",
    noteKey: "note.february",
    captionKeys: [
      "caption.feb1",
      "caption.feb2",
      "caption.feb3",
      "caption.feb4",
    ],
    color: "#D9A566", // Clay
  },
  {
    name: "March",
    noteKey: "note.march",
    captionKeys: ["caption.mar1", "caption.mar2", "caption.mar3"],
    color: "#6B7443", // Olive
  },
  {
    name: "April",
    noteKey: "note.april",
    captionKeys: [
      "caption.apr1",
      "caption.apr2",
      "caption.apr3",
      "caption.apr4",
    ],
    color: "#7A8599", // Lavender/Slate
  },
  {
    name: "May",
    noteKey: "note.may",
    captionKeys: ["caption.may1", "caption.may2", "caption.may3"],
    color: "#A68A64", // Taupe
  },
  {
    name: "June",
    noteKey: "note.june",
    captionKeys: [
      "caption.jun1",
      "caption.jun2",
      "caption.jun3",
      "caption.jun4",
    ],
    color: "#C06E52", // Rust
  },
  {
    name: "July",
    noteKey: "note.july",
    captionKeys: ["caption.jul1", "caption.jul2", "caption.jul3"],
    color: "#3E5C76", // Denim
  },
  {
    name: "August",
    noteKey: "note.august",
    captionKeys: [
      "caption.aug1",
      "caption.aug2",
      "caption.aug3",
      "caption.aug4",
    ],
    color: "#D9A566", // Clay
  },
  {
    name: "September",
    noteKey: "note.september",
    captionKeys: ["caption.sep1", "caption.sep2", "caption.sep3"],
    color: "#8B9A6B", // Mint/Sage
  },
  {
    name: "October",
    noteKey: "note.october",
    captionKeys: [
      "caption.oct1",
      "caption.oct2",
      "caption.oct3",
      "caption.oct4",
    ],
    color: "#C06E52", // Rust
  },
  {
    name: "November",
    noteKey: "note.november",
    captionKeys: ["caption.nov1", "caption.nov2", "caption.nov3"],
    color: "#A68A64", // Taupe
  },
  {
    name: "December",
    noteKey: "note.december",
    captionKeys: [
      "caption.dec1",
      "caption.dec2",
      "caption.dec3",
      "caption.dec4",
    ],
    color: "#4A4E69", // Slate
  },
];

export default function Home() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Build photos array with translated captions
  const getTranslatedMonths = () => {
    return monthsData.map((month, monthIndex) => {
      const photos = month.captionKeys.map((captionKey, photoIndex) => ({
        id: photoIndex + 1,
        src: `/photos/${month.name.toLowerCase()}/${photoIndex + 1}.jpg`,
        caption: t(captionKey),
      }));

      return {
        name: month.name,
        photos,
        color: month.color,
        note: t(month.noteKey),
      };
    });
  };

  const translatedMonths = getTranslatedMonths();

  return (
    <main ref={containerRef} className="relative min-h-screen">
      {/* Floating decorations in background */}
      <FloatingDecorations />

      {/* Glitter effect on scroll */}
      <GlitterEffect />

      {/* Hero Header */}
      <Header />

      {/* Month Sections */}
      <div className="relative z-10">
        {translatedMonths.map((month, index) => (
          <MonthSection
            key={month.name}
            name={month.name}
            photos={month.photos}
            color={month.color}
            note={month.note}
            index={index}
            isOdd={index % 2 === 0}
          />
        ))}
      </div>

      {/* Footer - Personal Memories */}
      <footer className="relative z-10 py-20 text-center">
        <div
          className="font-handwriting text-4xl md:text-6xl mb-4"
          style={{ color: "#8b5a2b" }}
        >
          {t("footer.title")}
        </div>
        <p className="text-lg font-light" style={{ color: "#A68A64" }}>
          {t("footer.subtitle")}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <span className="text-2xl animate-pulse">🏔️</span>
          <span className="text-2xl animate-float">🔥</span>
          <span className="text-2xl animate-pulse">⭐</span>
          <span className="text-2xl animate-float">☕</span>
          <span className="text-2xl animate-pulse">🌲</span>
        </div>
        <p
          className="mt-8 font-handwriting text-xl"
          style={{ color: "#4A4E69" }}
        >
          {t("footer.quote")}
        </p>
      </footer>
    </main>
  );
}
