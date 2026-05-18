"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Completely remove from DOM after 3s
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-primary transition-opacity duration-700 ease-in-out",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="w-full max-w-md h-full flex flex-col items-center justify-center p-12 text-white space-y-12">
        <div className="flex flex-col items-center space-y-8">
          <div className="bg-white/20 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-lg animate-in zoom-in duration-1000">
            <Shield className="w-24 h-24 text-white" strokeWidth={2.5} />
          </div>
          
          <div className="text-center space-y-2 animate-in slide-in-from-bottom-8 duration-700 delay-300">
            <h1 className="text-5xl font-black tracking-tighter uppercase">Welcome</h1>
            <p className="text-sm font-black tracking-[0.4em] opacity-70">SHEROUTE</p>
          </div>
        </div>

        <div className="text-center space-y-6 max-w-[300px] animate-in fade-in duration-1000 delay-700">
          <div className="h-px w-16 bg-white/20 mx-auto" />
          <p className="text-xl font-semibold italic leading-relaxed tracking-tight">
            "Safety is the freedom to move without fear. We walk with you."
          </p>
          <div className="h-px w-16 bg-white/20 mx-auto" />
        </div>

        <div className="absolute bottom-20 flex flex-col items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-0" />
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-150" />
            <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Initializing Safety Hub</p>
        </div>
      </div>
    </div>
  );
}
