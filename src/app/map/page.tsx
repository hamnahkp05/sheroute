'use client';

export default function SafetyMap() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Safe Route Prediction (Demo)</h2>

      <div
        style={{
          height: '400px',
          background: '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          marginBottom: 16
        }}
      >
        🗺️ Map Placeholder
      </div>

      <button onClick={() => alert('✅ Safest route predicted (Demo)')}>
        Predict Safe Route
      </button>
    </div>
  );
}