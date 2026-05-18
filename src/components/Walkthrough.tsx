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
import { Shield, MapPin, Bell, MessageSquare, Heart, Sparkles, Users, Zap } from "lucide-react";

export function Walkthrough() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenWalkthrough = localStorage.getItem("sheroute-walkthrough-v3");
    if (!hasSeenWalkthrough) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("sheroute-walkthrough-v3", "true");
    setOpen(false);
  };

  const slides = [
    {
      title: "Welcome to SHEROUTE",
      description: "\"Safety is not a luxury, it's the freedom to move without fear.\" — Empowering women with predictive technology and community care.",
      icon: Heart,
      accent: "bg-pink-100 text-primary",
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
      <DialogContent className="sm:max-w-md bg-white border-none rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
        <div className="p-10">
          <Carousel className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center text-center space-y-6 py-4">
                    <div className={`p-8 rounded-[2rem] ${slide.accent} animate-in zoom-in duration-500`}>
                      <slide.icon className="w-16 h-16" />
                    </div>
                    <div className="space-y-3">
                      <DialogTitle className="text-3xl font-black tracking-tighter text-primary">
                        {slide.title}
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground text-sm italic leading-relaxed px-4">
                        {slide.description}
                      </DialogDescription>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-6 mt-8">
              <CarouselPrevious className="relative translate-y-0 left-0 bg-muted hover:bg-muted/80 border-none h-12 w-12" />
              <CarouselNext className="relative translate-y-0 right-0 bg-muted hover:bg-muted/80 border-none h-12 w-12" />
            </div>
          </Carousel>
          <div className="mt-10">
            <Button 
              onClick={handleClose} 
              className="w-full rounded-2xl h-14 font-black text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-95"
            >
              START JOURNEY <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
