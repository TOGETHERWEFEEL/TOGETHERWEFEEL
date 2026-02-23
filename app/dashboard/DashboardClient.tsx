"use client";

import { useEffect, useMemo, useState } from "react"; // ✅ CHANGED (added useEffect)
import styles from "./page.module.css";
import SignOutButton from "@/app/components/signout-button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client"; // ✅ ADDED

type Props = {
  userId: string;
  email: string;
};

export default function DashboardClient({ userId, email }: Props) {
  const supabase = createSupabaseBrowserClient(); // ✅ ADDED

  const initials = useMemo(() => {
    if (!email) return "U";
    return email.trim().slice(0, 1).toUpperCase();
  }, [email]);

  const [symptom, setSymptom] = useState("");
  const [note, setNote] = useState("");

  // ✅ ADDED (tiny state)
  const [loadingPost, setLoadingPost] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // ✅ ADDED: simple sample ME TOO counts (keeps your UI the same)
  const [meToo1, setMeToo1] = useState(7);
  const [meToo2, setMeToo2] = useState(3);

  // ✅ ADDED: guest detection (your guest has no email)
  const isGuest = !email;

  // ✅ ADDED: Quick insights state
  const [yourPostsCount, setYourPostsCount] = useState<number>(0);
  const [yourMeTooCount, setYourMeTooCount] = useState<number>(0);
  const [mostCommonTrigger, setMostCommonTrigger] = useState<string>("—");

  // ✅ ADDED: load Quick insights from Supabase
  useEffect(() => {
    if (!userId || isGuest) return;

    async function loadStats() {
      const { data, error } = await supabase.rpc("get_dashboard_stats", {
        p_user_id: userId,
      });

      if (error || !data) return;

      // Your function returns: post_count, me_too_count, most_common_trigger
      setYourPostsCount(Number((data as any).post_count ?? 0));
      setYourMeTooCount(Number((data as any).me_too_count ?? 0));
      setMostCommonTrigger(((data as any).most_common_trigger as string) ?? "—");
    }

    loadStats();
  }, [supabase, userId, isGuest]);

  // ✅ ADDED: POST handler
  async function handlePost() {
    setMsg(null);

    if (isGuest) {
      setMsg("Guest mode can’t post. Please sign in with email.");
      return;
    }

    if (!symptom.trim()) {
      setMsg("Enter a symptom first.");
      return;
    }

    setLoadingPost(true);

    // Uses the userId prop you already have (no auth.getUser check)
    const { error } = await supabase.from("posts").insert({
      user_id: userId,
      symptom: symptom.trim(),
      trigger_note: note.trim() ? note.trim() : null,
    });

    if (error) {
      setMsg(error.message);
      setLoadingPost(false);
      return;
    }

    setSymptom("");
    setNote("");
    setMsg("Posted!");
    setLoadingPost(false);

    // ✅ ADDED: refresh stats after posting
    const { data, error: statsError } = await supabase.rpc("get_dashboard_stats", {
      p_user_id: userId,
    });

    if (!statsError && data) {
      setYourPostsCount(Number((data as any).post_count ?? 0));
      setYourMeTooCount(Number((data as any).me_too_count ?? 0));
      setMostCommonTrigger(((data as any).most_common_trigger as string) ?? "—");
    }
  }

  // ✅ ADDED: ME TOO handler (updates UI; also tries to save)
  async function handleMeToo(which: 1 | 2) {
    setMsg(null);

    if (isGuest) {
      setMsg("Guest mode can’t use ME TOO. Please sign in with email.");
      return;
    }

    // UI update immediately
    if (which === 1) setMeToo1((n) => n + 1);
    if (which === 2) setMeToo2((n) => n + 1);

    // Try to save (if you don't have this table yet, it will show an error in msg)
    const postKey = which === 1 ? "sample_post_1" : "sample_post_2";
    const { error } = await supabase.from("me_too").insert({
      user_id: userId,
      post_id: postKey,
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    // ✅ ADDED: refresh stats after ME TOO
    const { data, error: statsError } = await supabase.rpc("get_dashboard_stats", {
      p_user_id: userId,
    });

    if (!statsError && data) {
      setYourPostsCount(Number((data as any).post_count ?? 0));
      setYourMeTooCount(Number((data as any).me_too_count ?? 0));
      setMostCommonTrigger(((data as any).most_common_trigger as string) ?? "—");
    }
  }

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.logo}>TWF</div>
          <div className={styles.brandText}>
            <div className={styles.brandName}>TogetherWeFeel</div>
            <div className={styles.brandTagline}>
              Symptom reporting • Pattern discovery • Community insight
            </div>
          </div>
        </div>

        <div className={styles.userArea}>
          <div className={styles.userPill}>
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userMeta}>
              <div className={styles.userEmail}>{email || "Signed in"}</div>
              <div className={styles.userId}>ID: {userId.slice(0, 8)}…</div>
            </div>
          </div>

          <div className={styles.signOutWrap}>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.heroRow}>
          <h1 className={styles.h1}>Your symptom dashboard.</h1>
          <p className={styles.sub}>
            Clean, symptom-first reporting. Short trigger notes. No medical advice — shared experiences only.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left column */}
          <section className={styles.leftCol}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>Create a symptom post</div>
                  <div className={styles.cardHint}>
                    Keep it simple. One symptom + optional trigger note (≤ 300 chars).
                  </div>
                </div>
              </div>

              <div className={styles.form}>
                <label className={styles.label}>Symptom</label>
                <input
                  className={styles.input}
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder='Example: "Headache + brain fog"'
                />

                <label className={styles.label}>Trigger note (optional)</label>
                <textarea
                  className={styles.textarea}
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, 300))}
                  placeholder='Example: "Poor sleep + dehydration"'
                />

                <div className={styles.formFooter}>
                  <div className={styles.counter}>{note.length}/300</div>

                  <button
                    className={styles.primaryBtn}
                    type="button"
                    onClick={handlePost}
                    disabled={loadingPost}
                  >
                    {loadingPost ? "Posting…" : "Post"}
                  </button>
                </div>

                {msg && (
                  <p style={{ marginTop: 10, fontSize: 13, color: "#8a1f1f" }}>
                    {msg}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>Community feed</div>
                  <div className={styles.cardHint}>This will become your real feed next.</div>
                </div>
              </div>

              <div className={styles.feed}>
                <article className={styles.post}>
                  <div className={styles.postTop}>
                    <div className={styles.postTitle}>Headache + brain fog</div>
                    <div className={styles.postMeta}>Reported 12 minutes ago</div>
                  </div>
                  <div className={styles.postNote}>
                    Possible trigger: Poor sleep + dehydration
                  </div>
                  <div className={styles.postActions}>
                    <button
                      className={styles.ghostBtn}
                      type="button"
                      onClick={() => handleMeToo(1)}
                    >
                      🖐 ME TOO
                    </button>
                    <span className={styles.actionMeta}>{meToo1}</span>
                  </div>
                </article>

                <article className={styles.post}>
                  <div className={styles.postTop}>
                    <div className={styles.postTitle}>Chest tightness (mild)</div>
                    <div className={styles.postMeta}>Reported 1 hour ago</div>
                  </div>
                  <div className={styles.postNote}>
                    Possible trigger: Anxiety + caffeine
                  </div>
                  <div className={styles.postActions}>
                    <button
                      className={styles.ghostBtn}
                      type="button"
                      onClick={() => handleMeToo(2)}
                    >
                      🖐 ME TOO
                    </button>
                    <span className={styles.actionMeta}>{meToo2}</span>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Right column */}
          <aside className={styles.rightCol}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>Quick insights</div>
                  <div className={styles.cardHint}>A clean summary panel (real data later).</div>
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.statRow}>
                  <div className={styles.statLabel}>Your posts</div>
                  <div className={styles.statValue}>{yourPostsCount}</div>
                </div>
                <div className={styles.statRow}>
                  <div className={styles.statLabel}>Your ME TOO</div>
                  <div className={styles.statValue}>{yourMeTooCount}</div>
                </div>
                <div className={styles.statRow}>
                  <div className={styles.statLabel}>Most common symptom</div>
                  <div className={styles.statValue}>{mostCommonTrigger}</div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.cardTitle}>Medical disclaimer</div>
                  <div className={styles.cardHint}>
                    TogetherWeFeel is for shared experiences & pattern comparison only.
                  </div>
                </div>
              </div>

              <p className={styles.disclaimer}>
                This platform does not provide medical advice, diagnosis, or treatment.
                If you have urgent symptoms, seek professional medical care.
              </p>
            </div>
          </aside>
        </div>

        <footer className={styles.footer}>
          © {new Date().getFullYear()} TOGETHERWEFEEL (@TogetherWeFear) (TWF)
        </footer>
      </main>
    </div>
  );
}