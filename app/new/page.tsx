"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function NewPostPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [symptom, setSymptom] = useState("");
  const [triggers, setTriggers] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const cleanSymptom = symptom.trim();
    const cleanTriggers = triggers.trim();

    if (!cleanSymptom) {
      setMessage("Please enter a symptom (example: Headache).");
      return;
    }

    setLoading(true);

    // If logged in, attach user_id. If not, allow guest post (user_id = null).
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("posts").insert({
      symptom: cleanSymptom,
      triggers: cleanTriggers || null,
      user_id: user?.id ?? null,
    });

    setLoading(false);

    if (error) {
      setMessage(`Could not create post: ${error.message}`);
      return;
    }

    // Go back home and refresh list
    router.push("/");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        padding: "28px 22px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Create a symptom post</h1>
        <p style={{ marginTop: 10, opacity: 0.75, lineHeight: 1.6 }}>
          Share a symptom and what might have triggered it. Others can upvote if
          they relate. (No medical advice.)
        </p>

        <form onSubmit={handleSubmit} style={cardStyle}>
          <label style={labelStyle}>
            Symptom
            <input
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder='Example: "Headache"'
              style={inputStyle}
              maxLength={80}
            />
          </label>

          <label style={labelStyle}>
            Possible triggers / notes (optional)
            <textarea
              value={triggers}
              onChange={(e) => setTriggers(e.target.value)}
              placeholder='Example: "5 hours sleep, stress, 2 coffees"'
              style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
              maxLength={200}
            />
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>
              Keep it short (max 200 characters).
            </div>
          </label>

          {message && <div style={msgStyle}>{message}</div>}

          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" style={buttonPrimary} disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </button>

            <button
              type="button"
              style={buttonGhost}
              onClick={() => router.push("/")}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  marginTop: 18,
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: 16,
  padding: 16,
  background: "#fff",
  display: "grid",
  gap: 14,
};

const labelStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
  fontWeight: 700,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.14)",
  padding: "12px 12px",
  fontSize: 14,
  outline: "none",
};

const buttonPrimary: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.06)",
  background: "#0b5fff",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const buttonGhost: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.14)",
  background: "#fff",
  color: "#111",
  fontWeight: 800,
  cursor: "pointer",
};

const msgStyle: React.CSSProperties = {
  border: "1px solid rgba(255,0,0,0.25)",
  background: "rgba(255,0,0,0.06)",
  padding: 12,
  borderRadius: 12,
  color: "#7a0000",
};