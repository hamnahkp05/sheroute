"use client";

import React from "react";

const VoiceTrigger: React.FC = () => {
  const activateVoiceDemo = () => {
    alert(
      "🎙️ Voice Trigger Active\n\n" +
      "Say 'Help me' to trigger SOS.\n" +
      "(Demo simulation)"
    );
  };

  return (
    <button
      onClick={activateVoiceDemo}
      style={{
        padding: "10px 20px",
        backgroundColor: "#7c3aed",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
      }}
    >
      🎙️ Voice SOS
    </button>
  );
};

export default VoiceTrigger;