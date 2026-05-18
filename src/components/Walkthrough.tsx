"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Shield, MapPin, Bell, Users, Heart, Sparkles, Quote } from "lucide-react";

export function Walkthrough() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show walkthrough if not seen before
    const hasSeenWalkthrough = localStorage.getItem("sheroute-walkthrough-v5");
    if (!hasSeenWalkthrough) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("sheroute-walkthrough-v5", "true");
    setOpen(false);
  };

  const slides = [
    {
      title: "Welcome to SHEROUTE",
      description: "\"Safety is not a luxury, it's the freedom to move without fear.\" — Empowering women with predictive technology and community care.",
      icon: Heart,
      accent: "bg-pink-100 text-primary",
      isQuote: true,
    },
    {
      title: "Predictive Routing",
      description: "Our ML algorithm calculates the safest path by analyzing street lighting, historical reports, and real-time pedestrian density.",
      icon: MapPin,
      accent: "bg-pink-100 text-primary",
    },
    {
      title: "Guardian Circle",
      description: "Connect with trusted contacts who can track your journey in real-time and receive instant alerts if you need help.",
      icon: Users,
      accent: "bg-pink-100 text-primary",
    },
    {
      title: "Voice SOS: Say 'HELP'",
      description: "Simply shout 'HELP' to trigger emergency protocols. Our system listens for distress signals even when your screen is locked.",
      icon: Bell,
      accent: "bg-pink-100 text-primary",
    },
    {
      title: "Verified Safe Havens",
      description: "Find nearby businesses and stations that are certified safe zones where you can wait securely or seek immediate assistance.",
      icon: Shield,
      accent: "bg-pink-100 text-primary",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="fixed inset-0 w-screen h-screen max-w-none m-0 p-0 border-none rounded-none bg-background flex flex-col items-center justify-center z-[100] outline-none">
        <div className="w-full max-w-md h-full flex flex-col p-8 space-y-12">
          <div className="flex-1 flex flex-col justify-center">
            <Carousel className="w-full">
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col items-center text-center space-y-10 pb-6">
                      <div className={`p-8 rounded-[2rem] ${slide.accent} animate-in zoom-in duration-500 shadow-xl`}>
                        <slide.icon className="w-16 h-16" />
                      </div>
                      <div className="space-y-4 px-4">
                        <DialogTitle className="text-3xl font-black tracking-tight text-primary uppercase">
                          {slide.title}
                        </DialogTitle>
                        {slide.isQuote && (
                          <Quote className="w-10 h-10 text-primary/20 mx-auto -mb-4" />
                        )}
                        <DialogDescription className="text-muted-foreground text-base leading-relaxed italic">
                          {slide.description}
                        </DialogDescription>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-6 mt-12">
                <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-white border-2 border-primary/10 hover:bg-muted" />
                <CarouselNext className="static translate-y-0 h-12 w-12 bg-white border-2 border-primary/10 hover:bg-muted" />
              </div>
            </Carousel>
          </div>
          
          <div className="pb-10 w-full">
            <Button 
              onClick={handleClose} 
              className="w-full rounded-2xl h-16 font-black text-xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all active:scale-95"
            >
              START JOURNEY <Sparkles className="ml-3 w-6 h-6" />
            </Button>
            <p className="text-[12px] text-center text-muted-foreground mt-6 font-bold uppercase tracking-widest opacity-60">
              Securing Your Streets in Real-Time
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
