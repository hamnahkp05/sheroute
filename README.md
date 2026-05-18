# SHEROUTE | Women's Safety System

SHEROUTE is a modern web application built for women's safety, featuring predictive routing, real-time emergency SOS protocols, and a community-driven safety network.

## Tech Stack

### Front-end
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) - Handles routing, server-side rendering, and client-side interactivity.
- **Library**: [React 19](https://react.dev/) - For building the component-based user interface.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS for responsive, mobile-first design.
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - High-quality, accessible components built on Radix UI.
- **Icons**: [Lucide React](https://lucide.dev/) - Modern, consistent icon set.
- **Theming**: Custom HSL-based pink theme defined in `src/app/globals.css`.

### Back-end & Services
- **BaaS**: [Firebase](https://firebase.google.com/) - Integrated via `src/firebase/`.
  - **Authentication**: Google and Email/Password login (`src/app/login/page.tsx`).
  - **Firestore**: Real-time NoSQL database for User Profiles, Incidents, and Feedback (`docs/backend.json`).
- **Server Logic**: [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - Used for AI flows and data mutations.

### Generative AI
- **Framework**: [Genkit](https://firebase.google.com/docs/genkit) - For AI orchestration (`src/ai/genkit.ts`).
- **Model**: [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) - Used for route safety explanations (`src/ai/flows/safest-route-explanation-flow.ts`).

## Project Structure

- `src/app/`: The core of the application using Next.js App Router.
  - `(routes)/`: Contains page definitions (e.g., `/login`, `/routes`, `/havens`, `/reports`).
  - `layout.tsx`: Root layout wrapping the app in Firebase providers and global styles.
  - `globals.css`: Tailwind and ShadCN theme variables.
- `src/components/`: Reusable React components.
  - `ui/`: Lower-level ShadCN UI primitives.
  - `SOSButton.tsx`, `SafetyMap.tsx`, `Navigation.tsx`: App-specific functional components.
- `src/firebase/`: Initialization and custom hooks (`useUser`, `useDoc`, `useCollection`) for interacting with Firebase.
- `src/ai/`: Genkit configurations and AI flows for generating safety assessments.
- `docs/backend.json`: Schematic overview of the database structure and authentication rules.

## Key Features
- **Splash Screen**: Initial interface with safety quotes (`src/components/SplashScreen.tsx`).
- **Voice SOS**: Triggers emergency alerts on "HELP" command (`src/components/VoiceTrigger.tsx`).
- **Safe Path Predictor**: AI-driven route analysis (`src/app/routes/page.tsx`).
- **Identity Vault**: Encrypted user preference management (`src/app/vault/page.tsx`).
