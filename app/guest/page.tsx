"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function GuestPage() {
  const [status, setStatus] = useState("Signing in as guest...");

  useEffect(() => {
    const run = async () => {
      try {
        const supabase = createSupabaseBrowserClient();

        const { data, error } = await supabase.auth.signInAnonymously();

        if (error) {
          console.error(error);
          setStatus("Guest sign-in failed. Check Supabase Anonymous setting.");
          return;
        }

        // If sign-in succeeds, go to dashboard
        window.location.href = "/dashboard";
      } catch (e) {
        console.error(e);
        setStatus("Guest sign-in crashed. Check console.");
      }
    };

    run();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700 }}>Guest Access</h1>
      <p style={{ marginTop: 12 }}>{status}</p>
    </main>
  );
}