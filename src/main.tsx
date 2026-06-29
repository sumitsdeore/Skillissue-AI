import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.tsx";
import "./index.css";

function Bootstrap() {
  const [googleClientId, setGoogleClientId] = useState<string | null>(null);

  useEffect(() => {
    const buildTimeId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

    fetch("/api/config")
      .then((res) => res.json())
      .then((data: { googleClientId?: string }) => {
        setGoogleClientId(data.googleClientId || buildTimeId || "");
      })
      .catch(() => {
        setGoogleClientId(buildTimeId || "");
      });
  }, []);

  if (googleClientId === null) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500/30 border-t-purple-400 animate-spin" />
      </div>
    );
  }

  if (googleClientId) {
    return (
      <GoogleOAuthProvider clientId={googleClientId}>
        <App googleAuthEnabled />
      </GoogleOAuthProvider>
    );
  }

  return <App googleAuthEnabled={false} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>
);
