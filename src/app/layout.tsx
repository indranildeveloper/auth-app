import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auth App",
  description: "Auth app using better auth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${firaCode.variable} antialiased`}
      >
        <main className="container mx-auto">
          {children}
          <Toaster richColors />
        </main>
      </body>
    </html>
  );
}
