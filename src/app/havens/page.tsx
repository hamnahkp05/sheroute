import { SafetyMap } from "@/components/SafetyMap";

export default function HavensPage() {
  return (
    <main style={{ padding: "32px" }}>
      <h1>Safe Havens</h1>

      <p>
        Nearby police stations, hospitals, and verified safe locations.
      </p>

      <SafetyMap />
    </main>
  );
}