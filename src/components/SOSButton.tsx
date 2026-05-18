"use client";

import { useState, useEffect } from "react";
import { AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function SOSButton() {
  const [isActivating, setIsActivating] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActivating && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isActivating && countdown === 0) {
      triggerSOS();
    }
    return () => clearTimeout(timer);
  }, [isActivating, countdown]);

  const triggerSOS = () => {
    setIsActivating(false);
    setIsAlertActive(true);
    // Simulate real-time location broadcast
    toast({
      title: "SOS ALERT BROADCASTED",
      description: "Real-time GPS coordinates sent to emergency contacts.",
      variant: "destructive",
    });
  };

  const handlePress = () => {
    if (isAlertActive) {
      setIsAlertActive(false);
      setCountdown(3);
      toast({
        title: "SOS Alert Deactivated",
        description: "Your emergency contacts have been notified you are safe.",
      });
      return;
    }
    setIsActivating(true);
  };

  const cancelSOS = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActivating(false);
    setCountdown(3);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Breathing ring */}
        {!isAlertActive && (
          <div className="absolute inset-0 rounded-full bg-destructive/20 animate-breathe scale-150 -z-10" />
        )}
        
        <button
          onClick={handlePress}
          className={cn(
            "w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl relative overflow-hidden",
            isAlertActive 
              ? "bg-green-600 hover:bg-green-700" 
              : "sos-gradient hover:scale-95 active:scale-90"
          )}
        >
          {isAlertActive ? (
            <>
              <CheckCircle2 className="text-white w-12 h-12 mb-2" />
              <span className="text-white font-bold text-lg">I'M SAFE</span>
            </>
          ) : isActivating ? (
            <>
              <span className="text-white text-4xl font-black mb-1">{countdown}</span>
              <span className="text-white font-bold text-xs uppercase tracking-widest">Hold to Stop</span>
            </>
          ) : (
            <>
              <ShieldAlert className="text-white w-12 h-12 mb-2" />
              <span className="text-white font-black text-2xl tracking-tighter">SOS</span>
            </>
          )}
        </button>
      </div>

      {isActivating && (
        <Button variant="ghost" onClick={cancelSOS} className="text-muted-foreground hover:text-foreground">
          Cancel Trigger
        </Button>
      )}

      {isAlertActive && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-xs text-center animate-pulse">
          <p className="text-destructive font-bold text-sm">EMERGENCY PROTOCOL ACTIVE</p>
          <p className="text-xs text-destructive/80 mt-1">Live location is being shared with 5 contacts.</p>
        </div>
      )}
    </div>
  );
}