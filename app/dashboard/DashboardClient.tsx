"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import SignOutButton from "@/app/components/signout-button";

type Props = {
  userId: string;
  email: string;
};

export default function DashboardClient({ userId, email }: Props) {
  const initials = useMemo(() => {
    if (!email) return "U";
    return email.trim().slice(0, 1).toUpperCase();
  }, [email]);

  const [symptom, setSymptom] = useState("");
  const [note, setNote] = useState("");

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
                  <button className={styles.primaryBtn} type="button" disabled>
                    Post (UI only for now)
                  </button>
                </div>
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
                    <button className={styles.ghostBtn} type="button" disabled>
                      🖐 ME TOO (UI only)
                    </button>
                    <span className={styles.actionMeta}>7</span>
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
                    <button className={styles.ghostBtn} type="button" disabled>
                      🖐 ME TOO (UI only)
                    </button>
                    <span className={styles.actionMeta}>3</span>
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
                  <div className={styles.statValue}>—</div>
                </div>
                <div className={styles.statRow}>
                  <div className={styles.statLabel}>Your ME TOO</div>
                  <div className={styles.statValue}>—</div>
                </div>
                <div className={styles.statRow}>
                  <div className={styles.statLabel}>Most common symptom</div>
                  <div className={styles.statValue}>—</div>
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
          © {new Date().getFullYear()} TogetherWeFeel (TWF)
        </footer>
      </main>
    </div>
  );
}