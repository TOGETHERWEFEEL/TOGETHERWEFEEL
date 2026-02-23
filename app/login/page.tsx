"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    const clean = email.trim();
    if (!clean) {
      setMsg("Type your email first.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: clean,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("✅ Check your email for the secure sign-in link.");
  }

  function continueAsGuest() {
    // We mark guest mode in the URL for now.
    // (Later we can save a cookie or localStorage.)
    router.push("/?guest=1");
  }

  return (
    <main style={{ padding: 24, maxWidth: 520, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 10 }}>Sign in</h1>
      <p style={{ opacity: 0.7, marginTop: 0 }}>
        We’ll email you a secure login link.
      </p>

      <form
        onSubmit={handleMagicLink}
        style={{
          display: "grid",
          gap: 12,
          marginTop: 18,
          border: "1px solid #e5e5e5",
          borderRadius: 14,
          padding: 16,
          background: "#fff",
        }}
      >
        <label style={{ display: "grid", gap: 8, fontWeight: 700 }}>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ddd",
              fontSize: 15,
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "#111",
            color: "white",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Email me a secure link"}
        </button>

        {msg && (
          <div
            style={{
              padding: 10,
              borderRadius: 10,
              background: "rgba(0,0,0,0.05)",
              opacity: 0.85,
            }}
          >
            {msg}
          </div>
        )}
      </form>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={continueAsGuest}
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              fontWeight: 800,
              cursor: "pointer",
              flex: 1,
            }}
          >
            Continue as Guest
          </button>

          <button
            onClick={() => router.push("/")}
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid #ddd",
              background: "#fff",
              fontWeight: 800,
              cursor: "pointer",
              flex: 1,
            }}
          >
            Back to Home
          </button>
        </div>

        <p style={{ marginTop: 10, fontSize: 12, opacity: 0.6, lineHeight: 1.6 }}>
          Guest mode lets you explore the app without creating an account. Some
          features may be limited.
        </p>
      </div>
    </main>
  );
}