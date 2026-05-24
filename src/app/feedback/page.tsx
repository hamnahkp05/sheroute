"use client";

import React, { useState } from "react";

export default function FeedbackPage() {
  const [message, setMessage] = useState("");

  const submitFeedback = () => {
    alert("✅ Feedback submitted (Demo)");
    setMessage("");
  };

  return (
    <main style={{ padding: "32px" }}>
      <h1>Feedback</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Share your experience..."
        style={{
          width: "100%",
          height: "120px",
          padding: "12px",
          marginBottom: "16px",
        }}
      />

      <br />

      <button
        onClick={submitFeedback}
        style={{
          padding: "10px 20px",
          backgroundColor: "#16a34a",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </main>
  );
}