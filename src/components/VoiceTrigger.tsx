"use client";

import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VoiceTrigger() {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log("Voice Command detected:", transcript);
      
      // Focus on the keyword "HELP" as requested
      const triggerPhrases = ["help", "danger", "sos", "emergency"];
      
      if (triggerPhrases.some(phrase => transcript.includes(phrase))) {
        toast({
          title: "Voice SOS Triggered!",
          description: "Detected distress signal: '" + transcript.trim().toUpperCase() + "'. Activating SOS protocol...",
          variant: "destructive",
        });
      }
    };

    if (isListening) {
      try {
        recognition.start();
      } catch (e) {
        console.error("Speech recognition already started", e);
      }
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening, toast]);

  return (
    <button 
      onClick={() => setIsListening(!isListening)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs font-bold border-2 ${
        isListening 
          ? "bg-primary text-white border-primary animate-pulse" 
          : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
      }`}
    >
      {isListening ? (
        <>
          <Mic size={14} className="animate-bounce" />
          <span>LISTENING FOR "HELP"</span>
        </>
      ) : (
        <>
          <MicOff size={14} />
          <span>VOICE SOS: OFF</span>
        </>
      )}
    </button>
  );
}
