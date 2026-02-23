import "./globals.css";

export const metadata = {
  title: "TogetherWeFeel",
  description: "Compare symptoms. Find patterns. Feel less alone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}