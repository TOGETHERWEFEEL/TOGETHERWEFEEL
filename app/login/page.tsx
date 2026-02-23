'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');

    // Supabase magic-link logic goes here later
    setTimeout(() => {
      setStatus('sent');
    }, 800);
  };

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>TWF</div>

        {/* Title */}
        <h1 className={styles.title}>TogetherWeFeel</h1>
        <p className={styles.tagline}>
          Symptom reporting • Pattern discovery • Community insight
        </p>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Sign in */}
        <h2 className={styles.signin}>Sign in</h2>
        <p className={styles.subtext}>
          We’ll email you a secure login link.
        </p>

        {/* Card */}
        <form onSubmit={handleLogin} className={styles.card}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.primary}>
            {status === 'sending'
              ? 'Sending…'
              : status === 'sent'
              ? 'Check your email'
              : 'Email me a secure link'}
          </button>

          <button type="button" className={styles.secondary}>
            Continue as Guest
          </button>
        </form>

        {/* Footer */}
        <p className={styles.footer}>
          Guest mode lets you explore the app without creating an account.
          
        </p>
      </section>
    </main>
  );
}