import React from "react";

const Navigation = () => {
  const checkRouteSafety = () => {
    // demo values
    const crimeRate = Math.random();   // 0 to 1
    const lighting = Math.random();    // 0 to 1

    const score = Math.round((lighting - crimeRate) * 100);

    let status = "MEDIUM RISK";
    if (score > 30) status = "SAFE ROUTE ✅";
    if (score < 0) status = "UNSAFE ROUTE ❌";

    alert(`Route Status: ${status}\nSafety Score: ${score}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Safe Route Check</h2>
      <button
        onClick={checkRouteSafety}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Check Route
      </button>
    </div>
  );
};

export default Navigation;