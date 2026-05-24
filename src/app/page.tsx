
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main style={{ padding: 20 }}>
      <h1>SHEROUTE – Women Safety Demo</h1>

      <br />

      <button onClick={() => router.push('/map')}>
        Open Safety Map
      </button>

      <br /><br />

      <button onClick={() => alert('🚨 SOS Triggered (Demo)')}>
        SOS
      </button>
    </main>
  );
}