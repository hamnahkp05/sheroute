"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VoiceTrigger() {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log("Voice listening started");
        setIsListening(true);
      };

      recognition.onend = () => {
        console.log("Voice listening stopped");
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript.toLowerCase();

        console.log("Voice command detected:", transcript);

        const triggerPhrases = ["help", "danger", "sos", "emergency"];

        if (triggerPhrases.some((p) => transcript.includes(p))) {
          toast({
            title: "🚨 Voice SOS Triggered!",
            description:
              "Detected distress keyword: " +
              transcript.trim().toUpperCase(),
            variant: "destructive",
          });
        }
      };

      recognition.onerror = (err: any) => {
        console.error("Speech recognition error:", err);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Recognition already running");
      }
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-xs font-bold border-2 ${
        isListening
          ? "bg-primary text-white border-primary animate-pulse"
          : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
      }`}
    >
      {isListening ? (
        <>
          <Mic size={14} className="animate-bounce" />
          <span>LISTENING FOR “HELP”</span>
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
