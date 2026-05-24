"use client";

import React from "react";

export const SOSButton: React.FC = () => {
  const handleClick = () => {
    alert("🚨 SOS Triggered (Demo)");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "14px 24px",
        backgroundColor: "#dc2626",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      🚨 SOS
    </button>
  );
};