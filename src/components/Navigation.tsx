"use client";

import React, { useState } from "react";

// ✅ NAMED imports (this fixes your errors)
import { SafetyMap } from "./SafetyMap";
import { SOSButton } from "./SOSButton";
import { VoiceTrigger } from "./VoiceTrigger";

type Screen = "home" | "map";

const Navigation: React.FC = () => {
  const [screen, setScreen] = useState<Screen>("home");

  const checkRouteSafety = (): void => {
    const crimeRate = Math.random();
    const lighting = Math.random();

    const score = Math.round((lighting - crimeRate) * 100);

    let status = "⚠️ MEDIUM RISK";
    if (score > 30) status = "✅ SAFE ROUTE";
    if (score < 0) status = "❌ UNSAFE ROUTE";

    alert(
      `Route Safety Result\n\n` +
      `Status: ${status}\n` +
      `Safety Score: ${score}\n\n` +
      `(Demo prediction)`
    );
  };

  /* ---------- MAP SCREEN ---------- */
  if (screen === "map") {
    return (
      <div style={{ padding: "16px" }}>
        <button
          onClick={() => setScreen("home")}
          style={{
            marginBottom: "12px",
            padding: "8px 16px",
            background: "#e5e7eb",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ⬅ Back
        </button>

        <SafetyMap />
        <SOSButton />
        <VoiceTrigger />
      </div>
    );
  }

  /* ---------- HOME SCREEN ---------- */
  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold" }}>
        Safe Route Prediction
      </h2>

      <p style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
        Demo route safety evaluation using simulated data
      </p>

      <button
        onClick={checkRouteSafety}
        style={{
          padding: "12px 24px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Check Route Safety
      </button>

      <br />

      <button
        onClick={() => setScreen("map")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Open Safety Map
      </button>

      <div style={{ marginTop: "20px" }}>
        <SOSButton />
        <VoiceTrigger />
      </div>
    </div>
  );
};

export default Navigation;