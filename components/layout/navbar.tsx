"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Dumbbell } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button"; // Shadcn Button
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#timetable", label: "Timetable" },
    { href: "#facilities", label: "Facilities" },
    { href: "#membership", label: "Membership" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Replace with <Image> once you have the file asset */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
             <Dumbbell className="h-6 w-6" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-xl font-bold uppercase tracking-tighter text-white">
              New Bodies
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Gym
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="default" className="font-heading uppercase font-bold text-black" asChild>
            <Link href="/login">Member Login</Link>
          </Button>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background p-4 animate-in slide-in-from-top-5">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-heading font-medium uppercase text-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button className="w-full font-heading uppercase text-black" asChild>
              <Link href="/login">Member Login</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}