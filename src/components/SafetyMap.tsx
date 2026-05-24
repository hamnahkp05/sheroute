"use client";

import React, { useEffect, useState } from "react";

const SafetyMap: React.FC = () => {
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Safety Map Loaded");

    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return (
    <div
      style={{
        margin: "16px",
        padding: "20px",
        border: "2px dashed #16a34a",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>
        🗺️ Safety Map
      </h3>

      {!location && !error && (
        <p style={{ fontSize: "14px", color: "#555" }}>
          Fetching live location...
        </p>
      )}

      {error && (
        <p style={{ fontSize: "14px", color: "red" }}>
          ❌ {error}
        </p>
      )}

      {location && (
        <>
          <p style={{ fontSize: "14px", color: "#333" }}>
            📍 Your Current Location
          </p>
          <p style={{ fontSize: "13px", color: "#555" }}>
            Latitude: {location.lat.toFixed(6)}
            <br />
            Longitude: {location.lng.toFixed(6)}
          </p>
        </>
      )}
    </div>
  );
};

export default SafetyMap;