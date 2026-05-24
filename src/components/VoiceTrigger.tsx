"use client";

import React from "react";

export const VoiceTrigger: React.FC = () => {
  const startListening = () => {
    alert("🎙️ Voice trigger activated (Demo)");
  };

  return (
    <button
      onClick={startListening}
      style={{
        padding: "12px 20px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      🎙️ Voice Trigger
    </button>
  );
};