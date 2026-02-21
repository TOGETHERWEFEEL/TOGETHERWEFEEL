export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <header className="flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight">
            TOGETHERWEFEEL <span className="text-white/60">(TWF)</span>
          </div>

          <a
            href="/login"
            className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-white/40"
          >
            Sign in
          </a>
        </header>

        <section className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Feel it together.
              <br />
              Track symptoms.
              <br />
              Find patterns.
            </h1>

            <p className="mt-5 max-w-xl text-white/70">
              A shared space where people log what they’re feeling—headache,
              nausea, anxiety, fatigue—and upvote when they’re experiencing the
              same thing. Discover common triggers, compare notes, and feel less
              alone.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/signup"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90"
              >
                Create free account
              </a>

              <a
                href="/check-in"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-medium hover:border-white/40"
              >
                Check in today
              </a>
            </div>

            <p className="mt-4 text-xs text-white/50">
              Not medical advice. Community signals only.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/60">Trending today</div>

            <div className="mt-4 space-y-3">
              {[
                { name: "Headache", count: "1.2k" },
                { name: "Fatigue", count: "980" },
                { name: "Anxiety", count: "740" },
                { name: "Nausea", count: "510" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-white/60">{item.count} votes</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="text-sm font-medium">Quick idea</div>
              <div className="mt-1 text-sm text-white/70">
                “Headache after poor sleep + dehydration” is trending this week.
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} TOGETHERWEFEEL</div>

          <a
            href="https://www.amazon.com/s?i=digital-text&rh=p_27%3APOE%20NOCTURNE"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
            title="A little darkness, if you’re curious…"
          >
            Discover TOGETHERWEFEAR
          </a>
        </footer>
      </div>
    </main>
  );
}