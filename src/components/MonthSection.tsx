"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhotoCard from "./PhotoCard";
import StickyNote from "./scrapbook/StickyNote";
import Doodle from "./scrapbook/Doodle";
import Star from "./scrapbook/Star";
import Sticker from "./scrapbook/Sticker";

gsap.registerPlugin(ScrollTrigger);

interface Photo {
  id: number;
  src: string;
  caption: string;
}

interface MonthSectionProps {
  name: string;
  photos: Photo[];
  color: string;
  note: string;
  index: number;
  isOdd: boolean;
}

export default function MonthSection({
  name,
  photos,
  color,
  note,
  index,
  isOdd,
}: MonthSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const photosContainer = photosRef.current;
    const noteEl = noteRef.current;

    if (!section || !title || !photosContainer) return;

    const ctx = gsap.context(() => {
      // Title animation - simplified
      gsap.fromTo(
        title,
        {
          x: isOdd ? -50 : 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Photos stagger animation - simplified
      const photoCards = photosContainer.querySelectorAll(".photo-wrapper");
      gsap.fromTo(
        photoCards,
        {
          y: 40,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photosContainer,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Note animation - simplified
      if (noteEl) {
        gsap.fromTo(
          noteEl,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: noteEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Decorations animation - simplified, no parallax scroll
      const decorations = section.querySelectorAll(".month-deco");
      gsap.fromTo(
        decorations,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
      // Removed heavy parallax scrub animations for better performance
    }, section);

    return () => ctx.revert();
  }, [isOdd]);

  // Generate random positions for decorations
  const getRandomPosition = (base: number, range: number) =>
    base + Math.random() * range;

  // Determine photo layout based on count
  const getPhotoLayout = () => {
    const count = photos.length;
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count === 3) return "grid-cols-1 md:grid-cols-3";
    return "grid-cols-2 md:grid-cols-4";
  };

  const stickerTypes = [
    "mountain",
    "fire",
    "star",
    "leaf",
    "sun",
    "coffee",
    "camera",
    "tree",
    "tent",
    "compass",
  ] as const;
  const doodleTypes = ["star", "swirl", "arrow", "circle", "star"] as const;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, transparent 0%, ${color}15 50%, transparent 100%)`,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Stars */}
        <Star
          className="month-deco absolute text-coral"
          style={{ top: "10%", left: "5%" }}
          size={20}
        />
        <Star
          className="month-deco absolute text-butter"
          style={{ top: "20%", right: "10%" }}
          size={28}
        />
        <Star
          className="month-deco absolute text-mint"
          style={{ bottom: "30%", left: "8%" }}
          size={16}
        />

        {/* Doodles */}
        <div
          className="month-deco absolute"
          style={{ top: "15%", right: "5%" }}
        >
          <Doodle
            type={doodleTypes[index % doodleTypes.length]}
            color={color}
            size={40}
          />
        </div>
        <div
          className="month-deco absolute"
          style={{ bottom: "20%", left: "3%" }}
        >
          <Doodle
            type={doodleTypes[(index + 2) % doodleTypes.length]}
            color="var(--lavender)"
            size={35}
          />
        </div>

        {/* Stickers */}
        <div
          className="month-deco absolute"
          style={{ top: "40%", right: "2%" }}
        >
          <Sticker type={stickerTypes[index % stickerTypes.length]} size={50} />
        </div>
        {photos.length > 2 && (
          <div
            className="month-deco absolute"
            style={{ bottom: "15%", right: "8%" }}
          >
            <Sticker
              type={stickerTypes[(index + 1) % stickerTypes.length]}
              size={40}
            />
          </div>
        )}
      </div>

      {/* Month title */}
      <h2
        ref={titleRef}
        className="month-title mb-12 md:mb-16 px-4"
        style={{
          textAlign: isOdd ? "left" : "right",
          background: `linear-gradient(135deg, ${color}, var(--peach), var(--coral))`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          lineHeight: "1.2",
        }}
      >
        {name}
      </h2>

      {/* Photos grid */}
      <div
        ref={photosRef}
        className={`grid ${getPhotoLayout()} gap-8 md:gap-12 max-w-6xl mx-auto`}
      >
        {photos.map((photo, photoIndex) => (
          <div key={photo.id} className="photo-wrapper">
            <PhotoCard
              src={photo.src}
              caption={photo.caption}
              rotation={gsap.utils.random(-8, 8)}
              tapePosition={
                photoIndex % 3 === 0
                  ? "top"
                  : photoIndex % 3 === 1
                  ? "left"
                  : "right"
              }
            />
          </div>
        ))}
      </div>

      {/* Sticky note */}
      <div ref={noteRef} className="mt-12 md:mt-16 flex justify-center">
        <StickyNote text={note} color={color} rotation={isOdd ? -3 : 3} />
      </div>
    </section>
  );
}
