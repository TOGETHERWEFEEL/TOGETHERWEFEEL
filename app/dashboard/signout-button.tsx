"use client";

import { createSupabaseBrowserClient } from "@/lib/client";

export default function SignOutButton() {
  const supabase = createSupabaseBrowserClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        background: "#111",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "6px 12px",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Sign out
    </button>
  );
}