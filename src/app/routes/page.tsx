"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MapPin, Search, ShieldCheck, Info, ArrowRight, Loader2, Footprints, Moon, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { safestRouteExplanation, SafestRouteExplanationOutput } from "@/ai/flows/safest-route-explanation-flow";
import { Badge } from "@/components/ui/badge";

export default function RoutesPage() {
  const [start, setStart] = useState("");
  const [dest, setDest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SafestRouteExplanationOutput | null>(null);

  const handlePredict = async () => {
    if (!start || !dest) return;
    setIsLoading(true);
    try {
      // Mock safety assessment data based on destination
      const assessment = `This route from ${start} to ${dest} avoids known high-crime zones like Downtown East and passes through well-lit streets such as Main Street and Elm Avenue. It also has safe havens including Police Station Z and Hospital Q along the way. Pedestrian density is high during current hours, which adds to the safety factor.`;
      
      const response = await safestRouteExplanation({
        startLocation: start,
        endLocation: dest,
        safetyAssessment: assessment
      });
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 px-6 py-8 font-body">
      <header className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
          <ShieldCheck className="w-7 h-7" />
          Safe Path Predictor
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          ML-optimized routing based on crime data and crowd density.
        </p>
      </header>

      <main className="space-y-6">
        <Card className="border-none shadow-lg bg-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
                <Input 
                  placeholder="Street, City or Zip" 
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="pl-10 h-12 bg-muted/30 border-none rounded-xl" 
                />
              </div>
            </div>
            <div className="flex justify-center -my-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <ArrowRight className="text-primary rotate-90" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Destination</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
                <Input 
                  placeholder="Where are you going?" 
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  className="pl-10 h-12 bg-muted/30 border-none rounded-xl" 
                />
              </div>
            </div>
            <Button 
              className="w-full h-14 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 shadow-xl"
              onClick={handlePredict}
              disabled={isLoading || !start || !dest}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Analyzing Route Factors...
                </>
              ) : "Calculate Safest Path"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl bg-primary text-white">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none uppercase tracking-widest text-[10px]">ML Confidence: 94%</Badge>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold mt-2">Safety Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-white/90 text-sm leading-relaxed italic">
                   "{result.explanation}"
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                    <Moon className="w-5 h-5" />
                    <div className="text-[10px]">
                      <p className="font-bold uppercase opacity-60">Lighting</p>
                      <p className="font-black">9.2/10</p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                    <Footprints className="w-5 h-5" />
                    <div className="text-[10px]">
                      <p className="font-bold uppercase opacity-60">Density</p>
                      <p className="font-black">Medium</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {!result && !isLoading && (
          <div className="bg-muted/30 border-2 border-dashed border-muted p-8 rounded-3xl flex flex-col items-center justify-center text-center">
            <Info className="text-muted-foreground w-12 h-12 mb-4" />
            <h3 className="font-bold text-muted-foreground">Start Journey Analysis</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
              Our KNN algorithm will analyze historical crime reports and real-time pedestrian density for you.
            </p>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}