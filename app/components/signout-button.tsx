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
        padding: "8px 12px",
        borderRadius: 10,
        cursor: "pointer",
        fontWeight: 700,
      }}
    >
      Sign out
    </button>
  );
}
