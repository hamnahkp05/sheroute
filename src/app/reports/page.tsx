"use client";

import React from "react";

const ReportsPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "26px", fontWeight: "bold" }}>
        Safety Reports
      </h1>

      <p style={{ marginTop: "12px", color: "#555" }}>
        This is a demo reports page for the SHEROUTE women safety system.
      </p>

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          border: "2px dashed #2563eb",
          borderRadius: "8px",
        }}
      >
        <p>📊 Incident reports will appear here</p>
        <p>📍 Location-based safety analytics</p>
        <p>🛡️ Community submitted alerts</p>
      </div>
    </div>
  );
};

export default ReportsPage;