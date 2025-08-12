import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-foreground text-background text-xs font-semibold">
              Z
            </span>
            <span>© {new Date().getFullYear()} Zemenay. All rights reserved.</span>
          </div>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/services" className="hover:text-foreground">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/pricing#faq" className="hover:text-foreground">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
