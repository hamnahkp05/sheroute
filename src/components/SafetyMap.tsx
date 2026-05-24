"use client";

import React, { useEffect } from "react";

const SafetyMap: React.FC = () => {
  useEffect(() => {
    console.log("Safety Map Loaded");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          console.error("Location error:", error.message);
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        border: "2px dashed #16a34a",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontWeight: "bold" }}>🗺️ Safety Map</h3>
      <p style={{ fontSize: "14px", color: "#555" }}>
        Live location accessed. Check console for coordinates.
      </p>
    </div>
  );
};

export default SafetyMap;