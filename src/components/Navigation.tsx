"use client";

import React, { useState } from "react";
import SafetyMap from "./SafetyMap";

const Navigation = () => {
  const [screen, setScreen] = useState<"home" | "map">("home");

  const checkRouteSafety = () => {
    // Demo values (simulate ML output)
    const crimeRate = Math.random();   // 0 (low) → 1 (high)
    const lighting = Math.random();    // 0 (poor) → 1 (good)

    const score = Math.round((lighting - crimeRate) * 100);

    let status = "⚠️ MEDIUM RISK";
    let color = "#facc15";

    if (score > 30) {
      status = "✅ SAFE ROUTE";
      color = "#22c55e";
    }

    if (score < 0) {
      status = "❌ UNSAFE ROUTE";
      color = "#ef4444";
    }

    alert(
      `Route Safety Result\n\n` +
      `Status: ${status}\n` +
      `Safety Score: ${score}\n\n` +
      `(Demo prediction using crime & lighting factors)`
    );
  };

  /* ---------- MAP SCREEN ---------- */
  if (screen === "map") {
    return (
      <div>
        <button
          onClick={() => setScreen("home")}
          style={{
            margin: "12px",
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
      </div>
    );
  }

  /* ---------- HOME SCREEN ---------- */
  return (
    <div style={{ padding: "24px", textAlign: "center" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "12px" }}>
        Safe Route Prediction
      </h2>

      <p style={{ fontSize: "14px", marginBottom: "16px", color: "#666" }}>
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
          fontSize: "14px",
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
          fontSize: "14px",
        }}
      >
        Open Safety Map
      </button>
    </div>
  );
};

export default Navigation;