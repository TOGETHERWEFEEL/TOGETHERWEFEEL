"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoadingEmail(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoadingEmail(false);
      return;
    }

    setMessage("Check your email for a secure login link.");
    setLoadingEmail(false);
  }

  async function handleGuestLogin() {
    setMessage(null);
    setLoadingGuest(true);

    // (Optional) keep this if you want anonymous users in Supabase
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      setMessage(error.message);
      setLoadingGuest(false);
      return;
    }

    // IMPORTANT: set cookie BEFORE redirect
    document.cookie = "twf_guest=true; path=/; samesite=lax";

    window.location.assign("/dashboard");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        display: "flex",
        justifyContent: "center",
        padding: "56px 18px",
        fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      }}
    >
      <div style={{ width: "100%", maxWidth: 760 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 999,
              padding: "6px 14px",
              fontWeight: 700,
              letterSpacing: 0.5,
              fontSize: 14,
            }}
          >
            TWF
          </div>
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: 56,
            lineHeight: 1.05,
            margin: "18px 0 10px",
            fontWeight: 800,
          }}
        >
          TogetherWeFeel
        </h1>

        <p style={{ textAlign: "center", color: "#333", margin: 0, fontSize: 18 }}>
          Symptom reporting • Pattern discovery • Community insight
        </p>

        <div style={{ display: "flex", justifyContent: "center", margin: "28px 0 20px" }}>
          <div style={{ width: 64, height: 1, background: "#ddd" }} />
        </div>

        <h2 style={{ textAlign: "center", fontSize: 34, margin: "0 0 8px", fontWeight: 800 }}>
          Sign in
        </h2>

        <p style={{ textAlign: "center", margin: 0, color: "#444", fontSize: 16 }}>
          We’ll email you a secure login link.
        </p>

        <div
          style={{
            margin: "26px auto 0",
            maxWidth: 640,
            border: "1px solid #e5e5e5",
            borderRadius: 18,
            padding: 22,
            background: "rgba(0,0,0,0.03)",
          }}
        >
          <form onSubmit={handleEmailLogin} style={{ display: "grid", gap: 14 }}>
            <label style={{ fontWeight: 700, fontSize: 16 }}>Email</label>

            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 14px",
                borderRadius: 12,
                border: "1px solid #d6d6d6",
                outline: "none",
                fontSize: 16,
                background: "#fff",
              }}
            />

            <button
              type="submit"
              disabled={loadingEmail}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 999,
                border: "none",
                background: "#111",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              {loadingEmail ? "Sending…" : "Email me a secure link"}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loadingGuest}
            style={{
              width: "100%",
              marginTop: 12,
              padding: "14px 16px",
              borderRadius: 999,
              border: "1px solid #cfcfcf",
              background: "transparent",
              color: "#111",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {loadingGuest ? "Signing in…" : "Continue as Guest"}
          </button>

          <p style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "#666" }}>
            Guest mode lets you explore the app without creating an account.
          </p>

          {message && (
            <p
              style={{
                marginTop: 10,
                textAlign: "center",
                fontSize: 13,
                color: "#8a1f1f",
                fontFamily:
                  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
              }}
            >
              {message}
            </p>
          )}
        </div>

        <p
          style={{
            marginTop: 18,
            textAlign: "center",
            fontSize: 12,
            color: "#777",
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
          }}
        >
          This platform does not provide medical advice. @TogetherWeFeel (TogetherWeFear)
        </p>
      </div>
    </main>
  );
}