import { Navigation } from "@/components/Navigation";
import { SOSButton } from "@/components/SOSButton";
import { SafetyMap } from "@/components/SafetyMap";
import { VoiceTrigger } from "@/components/VoiceTrigger";
import { Shield, MapPin, Bell, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-24 font-body">
      <header className="px-6 py-6 bg-white border-b border-border sticky top-0 z-40">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg">
              <Shield className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-primary">SHEROUTE</h1>
          </div>
          <div className="flex items-center gap-3">
            <VoiceTrigger />
            <div className="relative">
              <Bell className="text-muted-foreground w-6 h-6" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white" />
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <Input 
            placeholder="Search destination or safe haven..." 
            className="pl-12 pr-4 h-14 bg-muted/30 border-none rounded-2xl shadow-inner focus-visible:ring-primary/20 text-base"
          />
        </div>
      </header>

      <main className="px-6 py-8 space-y-10">
        {/* Real-time Status Card */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Nearby Status</h2>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" /> Live Updating
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <Shield className="text-secondary w-8 h-8" />
                <div className="text-center">
                  <p className="text-2xl font-black text-primary">12</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Safe Havens</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <MapPin className="text-primary w-8 h-8" />
                <div className="text-center">
                  <p className="text-2xl font-black text-primary">0</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Active Alerts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SOS Section - Reach Safe Zone */}
        <section className="py-4">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-black tracking-tight text-center">EMERGENCY SOS</h2>
            <p className="text-xs text-muted-foreground text-center max-w-[200px]">
              Tap to trigger immediate rescue protocol and broadcast location.
            </p>
            <SOSButton />
          </div>
        </section>

        {/* Map Visualization */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">Risk Mapping</h2>
            <button className="text-primary text-xs font-bold hover:underline">Fullscreen Map</button>
          </div>
          <SafetyMap />
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="text-lg font-black tracking-tight">Safety Toolkit</h2>
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-none shadow-md overflow-hidden bg-primary text-white group cursor-pointer hover:bg-primary/90 transition-colors">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Safe Route Predictor</h3>
                  <p className="text-xs text-white/70">ML-optimized pathfinding for your journey.</p>
                </div>
                <div className="bg-white/10 p-3 rounded-full group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}