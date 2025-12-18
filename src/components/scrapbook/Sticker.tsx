"use client";

interface StickerProps {
  type:
    | "mountain"
    | "fire"
    | "star"
    | "leaf"
    | "sun"
    | "coffee"
    | "camera"
    | "tree"
    | "tent"
    | "compass";
  size?: number;
  className?: string;
}

export default function Sticker({
  type,
  size = 40,
  className = "",
}: StickerProps) {
  const stickers = {
    mountain: "🏔️",
    fire: "🔥",
    star: "⭐",
    leaf: "🍃",
    sun: "☀️",
    coffee: "☕",
    camera: "📸",
    tree: "🌲",
    tent: "⛺",
    compass: "🧭",
  };

  return (
    <span
      className={`inline-block animate-wiggle ${className}`}
      style={{
        fontSize: size,
        filter: "drop-shadow(2px 2px 4px rgba(139, 90, 43, 0.2))",
      }}
    >
      {stickers[type]}
    </span>
  );
}
