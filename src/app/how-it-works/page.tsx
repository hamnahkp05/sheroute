
"use client";

import { Navigation } from "@/components/Navigation";
import { Shield, MapPin, Users, Zap, Search, Bell, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Risk Detection",
      desc: "Our ML models process city crime reports and live sensor data to create high-resolution risk maps.",
      icon: Search,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Smart Pathfinding",
      desc: "When you enter a destination, we prioritize paths with verified lighting and community presence.",
      icon: MapPin,
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Guardian Circle",
      desc: "Your trusted contacts receive real-time updates and can visually track your journey in 3D.",
      icon: Users,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Active Protection",
      desc: "Our Voice SOS triggers if you shout 'SHEROUTE HELP', bypassing screen locks for immediate alert.",
      icon: Zap,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24 px-6 py-8 font-body overflow-x-hidden">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-black tracking-tight text-primary flex items-center justify-center gap-2">
          <Shield className="w-8 h-8" />
          The Science of Safety
        </h1>
        <p className="text-muted-foreground text-sm mt-3 max-w-[280px] mx-auto">
          How SHEROUTE combines data science with community vigilance.
        </p>
      </header>

      <main className="space-y-12">
        {/* Core Methodology */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black">1</div>
            <h2 className="text-xl font-black tracking-tight uppercase">Our Protocol</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {steps.map((step, idx) => (
              <Card key={idx} className="border-none shadow-lg bg-white overflow-hidden group hover:scale-[1.02] transition-all">
                <CardContent className="p-6 flex gap-5">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${step.color} group-hover:rotate-6 transition-transform`}>
                    <step.icon size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Real-time Demo Simulation View */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black">2</div>
            <h2 className="text-xl font-black tracking-tight uppercase">Live Analysis</h2>
          </div>
          <Card className="border-none shadow-2xl bg-primary text-white p-8 rounded-[2rem] text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-full animate-ping" />
                <Bell className="w-12 h-12" />
              </div>
            </div>
            <h3 className="text-2xl font-black">Predictive Alert</h3>
            <p className="text-sm opacity-90 leading-relaxed italic">
              "System detected a 15% increase in foot traffic on High Street. Updating your route to include this safe zone automatically."
            </p>
            <div className="pt-4">
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4 animate-[progress_3s_ease-in-out_infinite]" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest mt-2">ML Engine: Processing Density...</p>
            </div>
          </Card>
        </section>

        {/* Community Call to Action */}
        <section className="bg-white rounded-[2rem] p-8 shadow-xl text-center space-y-6">
          <Heart className="w-12 h-12 text-primary mx-auto" />
          <h3 className="text-2xl font-black">Power of the Circle</h3>
          <p className="text-sm text-muted-foreground">
            SHEROUTE is more than an app. It's a digital shield powered by thousands of women reporting, guiding, and looking out for each other.
          </p>
          <div className="space-y-3 pt-4">
            <Link href="/login">
              <Button className="w-full h-14 rounded-2xl bg-primary font-black shadow-lg">
                JOIN THE CIRCLE <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Free & Encrypted Forever</p>
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
