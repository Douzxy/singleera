"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const MUSIC_PREFERENCE_KEY = "musicPreference";

// SVG Icons for better quality
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function MusicPlayer() {
  const { language, setLanguage, t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check localStorage for existing preference
    const savedPreference = localStorage.getItem(MUSIC_PREFERENCE_KEY);

    if (savedPreference === null) {
      // First time visitor - show popup
      setShowModal(true);
    } else if (savedPreference === "yes") {
      // User previously chose YES - auto play
      setIsPlaying(true);
    }
    // If 'no', do nothing - music stays paused

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/background.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    // Control playback based on isPlaying state
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying]);

  const handleYes = () => {
    localStorage.setItem(MUSIC_PREFERENCE_KEY, "yes");
    setIsPlaying(true);
    setShowModal(false);
  };

  const handleNo = () => {
    localStorage.setItem(MUSIC_PREFERENCE_KEY, "no");
    setIsPlaying(false);
    setShowModal(false);
  };

  const toggleMusic = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    // Update preference in localStorage
    localStorage.setItem(MUSIC_PREFERENCE_KEY, newState ? "yes" : "no");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <>
      {/* Music Permission Modal */}
      {showModal && (
        <div
          className="music-modal-overlay"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="music-modal">
            <div className="text-5xl mb-4">🎵</div>
            <h2>{t("music.title")}</h2>
            <p>
              {t("music.description")}
              <br />
              <span className="text-sm opacity-70">{t("music.hint")}</span>
            </p>
            <div className="music-modal-buttons">
              <button className="btn-yes" onClick={handleYes}>
                {t("music.yes")}
              </button>
              <button className="btn-no" onClick={handleNo}>
                {t("music.no")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Controls Container */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[1001]">
        {/* Language Toggle Button */}
        <button
          className="control-btn tooltip-left"
          onClick={toggleLanguage}
          aria-label={`Switch to ${
            language === "en" ? "Indonesian" : "English"
          }`}
          data-tooltip={
            language === "en"
              ? "Ganti ke Bahasa Indonesia"
              : "Switch to English"
          }
        >
          <GlobeIcon />
          <span className="lang-label">{language === "en" ? "EN" : "ID"}</span>
        </button>

        {/* Music Control Button */}
        <button
          className={`control-btn music-btn tooltip-left ${
            isPlaying ? "playing" : ""
          }`}
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          data-tooltip={isPlaying ? "Pause Musik" : "Play Musik"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      <style jsx>{`
        .control-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b08860, #8b5a2b);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 2px;
          color: white;
          box-shadow: 0 4px 15px rgba(139, 90, 43, 0.3);
          transition: all 0.3s ease;
          position: relative;
        }

        .control-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(139, 90, 43, 0.4);
        }

        .control-btn:active {
          transform: scale(0.95);
        }

        .lang-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-top: -2px;
        }

        .music-btn.playing {
          animation: pulse 2s ease-in-out infinite;
          background: linear-gradient(135deg, #8b5a2b, #b08860);
        }

        /* Tooltip styles */
        .tooltip-left::before {
          content: attr(data-tooltip);
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          pointer-events: none;
          font-family: "Outfit", sans-serif;
        }

        .tooltip-left::after {
          content: "";
          position: absolute;
          right: calc(100% + 4px);
          top: 50%;
          transform: translateY(-50%);
          border: 6px solid transparent;
          border-left-color: rgba(0, 0, 0, 0.8);
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
        }

        .tooltip-left:hover::before,
        .tooltip-left:hover::after {
          opacity: 1;
          visibility: visible;
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 4px 15px rgba(139, 90, 43, 0.3);
          }
          50% {
            box-shadow: 0 4px 25px rgba(180, 140, 100, 0.6);
          }
        }
      `}</style>
    </>
  );
}
