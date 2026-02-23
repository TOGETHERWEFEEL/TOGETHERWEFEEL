import Link from "next/link";

export default function HomePage() {
  return (
    <main style={page}>
      <header style={topBar}>
        <div style={brand}>
          <div style={logo}>TWF</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={brandName}>TogetherWeFeel</div>
            <div style={brandTag}>Symptom reporting • Pattern discovery • Community insight</div>
          </div>
        </div>

        
      </header>

      <section style={hero}>
        <div style={heroLeft}>
          <h1 style={headline}>
            A professional place to log symptoms and compare possible triggers.
          </h1>

          <p style={subhead}>
            TogetherWeFeel helps people share symptoms and brief trigger notes so others experiencing
            the same issue can compare patterns. This platform is designed for responsible
            community reporting — not medical advice.
          </p>

          <div style={ctaRow}>
            <Link href="/login" style={primaryBtn}>
              Sign in to continue
            </Link>

            <div style={smallNote}>
              Passwordless secure link login (Magic Link)
            </div>
          </div>

          <div style={featureGrid}>
            <Feature
              title="Symptom-first reporting"
              text="Post what you feel in plain language with a short note about what may have triggered it."
            />
            <Feature
              title="Compare notes"
              text="See what others report when they experience similar symptoms to identify common patterns."
            />
            <Feature
              title="Designed to be clinical-friendly"
              text="Clean formatting and consistent structure so summaries are easy to review and share."
            />
          </div>
        </div>

        <div style={heroRight}>
          <div style={mockCard}>
            <div style={mockTitle}>Example symptom post</div>
            <div style={mockSymptom}>Headache + brain fog</div>
            <div style={mockTrigger}>
              <strong>Possible trigger:</strong> Poor sleep + dehydration
            </div>
            <div style={mockMeta}>Reported 12 minutes ago • 👍 7</div>

            <div style={divider} />

            <div style={mockTitle}>Example symptom post</div>
            <div style={mockSymptom}>Chest tightness (mild)</div>
            <div style={mockTrigger}>
              <strong>Possible trigger:</strong> Anxiety + caffeine
            </div>
            <div style={mockMeta}>Reported 1 hour ago • 👍 3</div>
          </div>
        </div>
      </section>

      <footer style={footer}>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Medical Disclaimer</div>
        <div style={{ opacity: 0.75, lineHeight: 1.6, fontSize: 13 }}>
          TogetherWeFeel is for shared experiences and pattern comparison only. It does not provide
          medical advice, diagnosis, or treatment. If you have urgent symptoms, seek professional
          medical care.
        </div>

        <div style={{ marginTop: 10, opacity: 0.6, fontSize: 12 }}>
          © {new Date().getFullYear()} TogetherWeFeel (TWF)
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div style={featureCard}>
      <div style={featureTitle}>{title}</div>
      <div style={featureText}>{text}</div>
    </div>
  );
}

/* ---------------- styles ---------------- */

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "#fff",
  color: "#111",
};

const topBar: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "18px 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
};

const brand: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const logo: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
  letterSpacing: 0.6,
};

const brandName: React.CSSProperties = {
  fontWeight: 950,
  letterSpacing: 0.2,
};

const brandTag: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.65,
};

const signInBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 900,
  background: "#fff",
  color: "#111",
  border: "1px solid rgba(0,0,0,0.12)",
};

const hero: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "28px 18px 10px",
  display: "grid",
  gridTemplateColumns: "1.15fr 0.85fr",
  gap: 22,
};

const heroLeft: React.CSSProperties = {
  minWidth: 0,
};

const heroRight: React.CSSProperties = {
  minWidth: 0,
};

const headline: React.CSSProperties = {
  margin: 0,
  fontSize: 40,
  lineHeight: 1.08,
  letterSpacing: -0.8,
  fontWeight: 950,
};

const subhead: React.CSSProperties = {
  marginTop: 12,
  marginBottom: 0,
  fontSize: 16,
  lineHeight: 1.7,
  opacity: 0.78,
  maxWidth: 640,
};

const ctaRow: React.CSSProperties = {
  marginTop: 18,
  display: "flex",
  alignItems: "center",
  gap: 14,
  flexWrap: "wrap",
};

const primaryBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 950,
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(0,0,0,0.06)",
};

const smallNote: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.65,
};

const featureGrid: React.CSSProperties = {
  marginTop: 18,
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12,
};

const featureCard: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: 16,
  padding: 14,
  background: "rgba(0,0,0,0.02)",
};

const featureTitle: React.CSSProperties = {
  fontWeight: 950,
  marginBottom: 6,
};

const featureText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.75,
};

const mockCard: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: 18,
  padding: 16,
  background: "#fff",
  boxShadow: "0 8px 26px rgba(0,0,0,0.06)",
};

const mockTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 950,
  opacity: 0.7,
  letterSpacing: 0.2,
  marginBottom: 6,
};

const mockSymptom: React.CSSProperties = {
  fontWeight: 950,
  fontSize: 18,
  marginBottom: 6,
};

const mockTrigger: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.78,
};

const mockMeta: React.CSSProperties = {
  marginTop: 8,
  fontSize: 12,
  opacity: 0.6,
};

const divider: React.CSSProperties = {
  height: 1,
  background: "rgba(0,0,0,0.10)",
  margin: "14px 0",
};

const footer: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "18px 18px 26px",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  marginTop: 22,
};

/* Mobile */
const _mobileHint = `
If it looks too wide on mobile, we can move the hero to one column.
Just tell me "make homepage mobile stacked" and I’ll update this page.
`;