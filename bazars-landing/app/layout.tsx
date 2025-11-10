import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bazars.io - The Infrastructure Layer for Cross-Border B2B Trade",
  description: "Trusted partner for governments and economic zones to deploy scalable, compliant trade hubs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
