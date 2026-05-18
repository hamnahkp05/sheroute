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
import { Shield, MapPin, Bell, MessageSquare, Heart } from "lucide-react";

export function Walkthrough() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenWalkthrough = localStorage.getItem("sheroute-walkthrough");
    if (!hasSeenWalkthrough) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("sheroute-walkthrough", "true");
    setOpen(false);
  };

  const slides = [
    {
      title: "Welcome to SHEROUTE",
      description: "\"Safety is not a luxury, it's the freedom to move without fear.\" — Empowering women with predictive technology and community care.",
      icon: Heart,
    },
    {
      title: "Predictive Routing",
      description: "Our ML algorithm calculates the safest path, not just the shortest, by analyzing crime data and lighting.",
      icon: MapPin,
    },
    {
      title: "Emergency SOS",
      description: "Activate SOS via voice by shouting \"HELP\" or tap the button to alert your Guardian Circle instantly.",
      icon: Bell,
    },
    {
      title: "Safe Havens",
      description: "Find verified safe locations like police stations and friendly local businesses near you.",
      icon: MessageSquare,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white border-none rounded-[2rem] p-0 overflow-hidden">
        <div className="p-8">
          <Carousel className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center text-center space-y-4 py-4">
                    <div className="bg-primary/10 p-6 rounded-3xl">
                      <slide.icon className="w-12 h-12 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-black text-primary">
                      {slide.title}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm italic">
                      {slide.description}
                    </DialogDescription>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious className="relative translate-y-0 left-0 bg-muted hover:bg-muted/80 border-none" />
              <CarouselNext className="relative translate-y-0 right-0 bg-muted hover:bg-muted/80 border-none" />
            </div>
          </Carousel>
          <div className="mt-8">
            <Button onClick={handleClose} className="w-full rounded-2xl h-12 font-bold bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
