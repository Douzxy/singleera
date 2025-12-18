"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Doodle from "./scrapbook/Doodle";
import Star from "./scrapbook/Star";
import Blob from "./scrapbook/Blob";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!header || !title || !subtitle) return;

    const ctx = gsap.context(() => {
      // Title reveal animation
      const lines = title.querySelectorAll(".line-inner");

      gsap.fromTo(
        lines,
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.3,
        }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitle,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1,
        }
      );

      // Decorations float in
      const decorations = header.querySelectorAll(".header-deco");
      gsap.fromTo(
        decorations,
        {
          opacity: 0,
          scale: 0,
          rotate: -20,
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 0.8,
        }
      );

      // Parallax on scroll
      gsap.to(header, {
        scrollTrigger: {
          trigger: header,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 150,
        opacity: 0.3,
      });
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Background decorations - Personal Memories Theme */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blobs - Warm Earthy tones */}
        <Blob
          className="header-deco absolute top-20 left-10 w-40 h-40"
          color="var(--clay)"
        />
        <Blob
          className="header-deco absolute top-40 right-20 w-32 h-32"
          color="var(--taupe)"
        />
        <Blob
          className="header-deco absolute bottom-40 left-1/4 w-48 h-48"
          color="var(--lavender)"
        />
        <Blob
          className="header-deco absolute bottom-20 right-1/3 w-36 h-36"
          color="var(--butter)"
        />

        {/* Stars */}
        <Star
          className="header-deco absolute top-32 left-1/4 text-rust"
          size={24}
        />
        <Star
          className="header-deco absolute top-48 right-1/4 text-clay"
          size={32}
        />
        <Star
          className="header-deco absolute bottom-60 left-20 text-olive"
          size={20}
        />
        <Star
          className="header-deco absolute top-1/3 right-10 text-denim"
          size={28}
        />
        <Star
          className="header-deco absolute bottom-40 right-20 text-taupe"
          size={22}
        />

        {/* Personal Doodles */}
        <div className="header-deco absolute top-20 right-1/4">
          <Doodle type="star" color="var(--rust)" size={50} />
        </div>
        <div className="header-deco absolute bottom-32 left-1/3">
          <Doodle type="swirl" color="var(--clay)" size={60} />
        </div>
        <div className="header-deco absolute top-1/2 left-10">
          <Doodle type="swirl" color="var(--olive)" size={40} />
        </div>

        {/* Floating Personal Icons */}
        <span className="header-deco absolute top-28 left-1/3 text-3xl animate-float">
          🔥
        </span>
        <span className="header-deco absolute top-1/4 right-1/3 text-4xl animate-float-slow">
          ☕
        </span>
        <span className="header-deco absolute bottom-48 right-1/4 text-2xl animate-float">
          🎸
        </span>
        <span className="header-deco absolute bottom-60 left-1/4 text-3xl animate-float-slow">
          🏔️
        </span>
      </div>

      {/* Main title */}
      <h1
        ref={titleRef}
        className="hero-title text-center relative z-10 mb-8 px-4"
      >
        <span className="line">
          <span className="line-inner bg-gradient-to-r from-rust via-clay to-taupe bg-clip-text text-transparent whitespace-nowrap">
            {t("hero.title")}
          </span>
        </span>
        <span className="line mt-4">
          <span className="line-inner text-3xl md:text-4xl lg:text-5xl flex items-center justify-center gap-2 md:gap-3 flex-wrap">
            <span className="text-slate">Edo Priyatna</span>
            <span className="text-2xl md:text-3xl">✨</span>
            <span className="text-denim">(Douzxy)</span>
          </span>
        </span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-lg md:text-xl font-light text-center max-w-xl relative z-10"
        style={{ color: "#4A4E69" }}
      >
        {t("hero.subtitle")}
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_1s_ease_2s_forwards]">
        <span className="font-handwriting text-xl" style={{ color: "#4A4E69" }}>
          {t("hero.scroll")}
        </span>
        <div className="w-6 h-10 border-2 border-clay/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-rust rounded-full animate-bounce" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </header>
  );
}
