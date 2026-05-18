"use client";

import Image from "next/image";
import { MapPin, Shield, Hospital, Building2 } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { Card } from "@/components/ui/card";

export function SafetyMap() {
  const mapImage = PlaceHolderImages.find(img => img.id === "safety-map");

  const hotspots = [
    { id: 1, type: "haven", top: "40%", left: "30%", label: "Safe Haven: Local Cafe" },
    { id: 2, type: "police", top: "60%", left: "70%", label: "Police Station Central" },
    { id: 3, type: "hospital", top: "25%", left: "65%", label: "City General Hospital" },
    { id: 4, type: "safe-zone", top: "50%", left: "50%", label: "High Visibility Street" },
  ];

  return (
    <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-border group">
      {mapImage && (
        <Image
          src={mapImage.imageUrl}
          alt="Safety Map"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint={mapImage.imageHint}
        />
      )}
      
      {/* Map Overlays */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      
      {hotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute group/pin cursor-pointer"
          style={{ top: spot.top, left: spot.left }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-white/50 rounded-full animate-ping opacity-75" />
            <div className="relative bg-white p-1.5 rounded-full shadow-lg border border-primary/20 hover:scale-110 transition-transform">
              {spot.type === "haven" && <Shield className="w-4 h-4 text-secondary" />}
              {spot.type === "police" && <Building2 className="w-4 h-4 text-primary" />}
              {spot.type === "hospital" && <Hospital className="w-4 h-4 text-red-500" />}
              {spot.type === "safe-zone" && <MapPin className="w-4 h-4 text-green-500" />}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold shadow-md border border-border pointer-events-none">
              {spot.label}
            </div>
          </div>
        </div>
      ))}

      {/* Map Legend/Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Card className="p-2 bg-white/90 backdrop-blur-md border-none shadow-lg">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500" /> Safe Zone
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium">
              <div className="w-2 h-2 rounded-full bg-secondary" /> Safe Haven
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}