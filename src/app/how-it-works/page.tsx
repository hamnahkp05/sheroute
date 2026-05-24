
"use client";

import { SafetyMap } from "@/components/SafetyMap";
import { SOSButton } from "@/components/SOSButton";
import { VoiceTrigger } from "@/components/VoiceTrigger";

export default function HowItWorksPage() {
  return (
    <main style={{ padding: "32px" }}>
      <h1>How SheRoute Works</h1>

      <p>
        SheRoute helps women travel safely using AI-assisted routes and
        emergency features.
      </p>

      <SafetyMap />

      <div style={{ marginTop: "24px", display: "flex", gap: "16px" }}>
        <SOSButton />
        <VoiceTrigger />
      </div>
    </main>
  );
}
