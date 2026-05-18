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
    const hasSeenWalkthrough = localStorage.getItem("sheroute-walkthrough-v4");
    if (!hasSeenWalkthrough) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("sheroute-walkthrough-v4", "true");
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
      <DialogContent className="w-[90vw] max-w-md bg-white border-none rounded-[2rem] p-0 overflow-hidden shadow-2xl focus:outline-none">
        <div className="flex flex-col h-full max-h-[85vh]">
          <div className="flex-1 overflow-y-auto px-6 pt-10 pb-4">
            <Carousel className="w-full">
              <CarouselContent>
                {slides.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col items-center text-center space-y-6 pb-6">
                      <div className={`p-6 rounded-[1.5rem] ${slide.accent} animate-in zoom-in duration-500 shadow-inner`}>
                        <slide.icon className="w-12 h-12" />
                      </div>
                      <div className="space-y-3 px-2">
                        <DialogTitle className="text-2xl font-black tracking-tight text-primary uppercase">
                          {slide.title}
                        </DialogTitle>
                        {slide.isQuote && (
                          <Quote className="w-8 h-8 text-primary/20 mx-auto -mb-2" />
                        )}
                        <DialogDescription className="text-muted-foreground text-sm leading-relaxed italic">
                          {slide.description}
                        </DialogDescription>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-4">
                <CarouselPrevious className="static translate-y-0 h-10 w-10 bg-muted border-none hover:bg-muted/80" />
                <CarouselNext className="static translate-y-0 h-10 w-10 bg-muted border-none hover:bg-muted/80" />
              </div>
            </Carousel>
          </div>
          
          <div className="p-6 bg-white border-t border-muted/30">
            <Button 
              onClick={handleClose} 
              className="w-full rounded-xl h-14 font-black text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-transform active:scale-95"
            >
              START JOURNEY <Sparkles className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-4 font-bold uppercase tracking-widest">
              Securing Your Streets in Real-Time
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
