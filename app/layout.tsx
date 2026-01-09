import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google"; // Oswald works great for Gym headers
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "New Bodies Gym | Buxton",
  description: "New Bodies Gym in Buxton. Where everyone is welcome. Cardio, Weights, Classes, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> 
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          oswald.variable
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}