"use client";

import React from "react";

const SOSButton: React.FC = () => {
  const sendSOS = () => {
    alert(
      "🚨 SOS ACTIVATED!\n\n" +
      "Emergency contacts notified.\n" +
      "(Demo only – no SMS sent)"
    );
  };

  return (
    <button
      onClick={sendSOS}
      style={{
        padding: "12px 24px",
        backgroundColor: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px",
        marginBottom: "12px",
      }}
    >
      🚨 SOS
    </button>
  );
};

export default SOSButton;