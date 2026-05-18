"use client";

import { Navigation } from "@/components/Navigation";
import { Shield, MapPin, Phone, Star, CheckCircle2, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import Image from "next/image";

export default function HavensPage() {
  const havenImg = PlaceHolderImages.find(img => img.id === "safe-haven");

  const havens = [
    {
      id: 1,
      name: "Downtown Police Precinct",
      type: "Official Station",
      distance: "0.2 miles",
      address: "124 Security Ave, Metropolis",
      hours: "24/7 Open",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Metropolis General Hospital",
      type: "Medical Hub",
      distance: "0.8 miles",
      address: "45 Care Road, Metropolis",
      hours: "24/7 Open",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Starbucks High Street",
      type: "Verified Business",
      distance: "1.1 miles",
      address: "88 Main St, Metropolis",
      hours: "06:00 - 23:00",
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 px-6 py-8 font-body">
      <header className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
          <Shield className="w-7 h-7" />
          Safe Havens
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Verified secure locations where you can seek immediate help or wait safely.
        </p>
      </header>

      <main className="space-y-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <Input 
            placeholder="Search havens near you..." 
            className="pl-12 pr-4 h-12 bg-white border-none rounded-2xl shadow-md"
          />
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-black tracking-tight">Nearest Verified Hubs</h2>
          <div className="space-y-4">
            {havens.map((haven) => (
              <Card key={haven.id} className="border-none shadow-lg bg-white overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-32 aspect-video sm:aspect-square bg-muted">
                    {havenImg && (
                      <Image 
                        src={havenImg.imageUrl} 
                        alt={haven.name} 
                        fill 
                        className="object-cover"
                        data-ai-hint={havenImg.imageHint}
                      />
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-primary text-white border-none text-[8px] uppercase tracking-tighter">Verified</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-primary">{haven.name}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-orange-500">
                        <Star size={12} fill="currentColor" />
                        {haven.rating}
                      </div>
                    </div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">{haven.type} • {haven.distance}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={12} className="text-primary" />
                        {haven.address}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 size={12} className="text-green-500" />
                        {haven.hours}
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-primary text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1">
                        <MapPin size={10} /> Get Directions
                      </button>
                      <button className="flex-1 border border-primary text-primary text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1">
                        <Phone size={10} /> Call Now
                      </button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}