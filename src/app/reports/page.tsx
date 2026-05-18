"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { AlertTriangle, MapPin, Camera, Send, CheckCircle2, Moon, Users, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

export default function ReportsPage() {
  const { toast } = useToast();
  const { firestore } = useFirestore();
  const { user } = useUser();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("lighting");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to submit a report.",
      });
      return;
    }

    setLoading(true);

    const reportData = {
      userId: user.uid,
      type,
      location,
      description,
      timestamp: new Date().toISOString(),
      createdAt: serverTimestamp(),
    };

    const reportsRef = collection(firestore, "incidents");

    addDoc(reportsRef, reportData)
      .then(() => {
        setSubmitted(true);
        toast({
          title: "Incident Logged",
          description: "Thank you for contributing to SHEROUTE safety data.",
        });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: "incidents",
          operation: "create",
          requestResourceData: reportData,
        });
        errorEmitter.emit("permission-error", permissionError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center font-body">
        <div className="bg-white p-12 rounded-[2rem] shadow-xl space-y-6">
          <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-black text-primary">Report Received</h1>
          <p className="text-muted-foreground text-sm">
            Our ML model is updating risk maps based on your feedback. You've helped make your city safer.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="w-full rounded-xl h-12">
            Submit Another Report
          </Button>
        </div>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 px-6 py-8 font-body">
      <header className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-primary flex items-center gap-2">
          <AlertTriangle className="w-7 h-7" />
          Incident HUD
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          Help others by reporting safety issues or high-risk zones.
        </p>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Type of Concern</label>
                <RadioGroup value={type} onValueChange={setType} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="lighting" id="lighting" className="peer sr-only" />
                    <Label
                      htmlFor="lighting"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                    >
                      <Moon className="mb-2 h-6 w-6" />
                      <span className="text-[10px] font-bold uppercase">Poor Light</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="crowd" id="crowd" className="peer sr-only" />
                    <Label
                      htmlFor="crowd"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                    >
                      <Users className="mb-2 h-6 w-6" />
                      <span className="text-[10px] font-bold uppercase">Crowded</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="harassment" id="harassment" className="peer sr-only" />
                    <Label
                      htmlFor="harassment"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                    >
                      <AlertTriangle className="mb-2 h-6 w-6" />
                      <span className="text-[10px] font-bold uppercase">Harassment</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="other" id="other" className="peer sr-only" />
                    <Label
                      htmlFor="other"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-white p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary cursor-pointer"
                    >
                      <MoreHorizontal className="mb-2 h-6 w-6" />
                      <span className="text-[10px] font-bold uppercase">Other</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
                  <Input 
                    placeholder="Enter or pin location" 
                    className="pl-10 h-12 bg-muted/30 border-none rounded-xl" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description</label>
                <Textarea 
                  placeholder="Describe the incident or risk factor..." 
                  className="bg-muted/30 border-none rounded-xl min-h-[120px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl gap-2">
                  <Camera size={18} /> Add Photo
                </Button>
                <Button type="submit" className="flex-1 h-12 rounded-xl gap-2 bg-primary" disabled={loading}>
                  <Send size={18} /> {loading ? "Logging..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>

      <Navigation />
    </div>
  );
}
