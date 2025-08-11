"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-foreground text-background text-xs">
              Z
            </span>
            <span>Zemenay</span>
          </Link>

          {/* Mobile nav */}
          <nav className="md:hidden flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/services" className="hover:text-foreground">
              Services
            </a>
            <a href="/pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="/about" className="hover:text-foreground">
              About
            </a>
          </nav>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="secondary" size="sm" className="rounded-full">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
