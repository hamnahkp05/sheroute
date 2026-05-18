import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";
import { SplashScreen } from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: 'SHEROUTE | Women Safety System',
  description: 'Predictive route safety and emergency SOS broadcasting.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background h-full overflow-x-hidden">
        <FirebaseClientProvider>
          <SplashScreen />
          <div className="flex justify-center min-h-screen bg-muted/20 overflow-x-hidden">
            <div className="w-full max-w-md relative min-h-screen shadow-2xl bg-background overflow-x-hidden">
              {children}
            </div>
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
