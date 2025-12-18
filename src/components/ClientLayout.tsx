"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import SmoothScroll from "@/components/SmoothScroll";
import MusicPlayer from "@/components/MusicPlayer";

function MainLayout({ children }: { children: ReactNode }) {
  // Always show content directly without login
  return (
    <LanguageProvider>
      <SmoothScroll>{children}</SmoothScroll>
      <MusicPlayer />
    </LanguageProvider>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}
