import Link from "next/link"
import Image from "next/image"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-0">
            <div className="relative h-10 w-14">
            {/* Black logo - visible in light mode */}
            <Image
              src="/images/Zemenay-Logo-Black.png"
              alt="Zemenay Logo"
              width={40}
              height={32}
              className="object-contain dark:hidden"
            />
            {/* White logo - visible in dark mode */}
            <Image
              src="/images/Zemenay-Logo-White.png"
              alt="Zemenay Logo"
              width={40}
              height={34}
              className="hidden object-contain dark:block"
            />
            </div>
            <span className="text-sm text-muted-foreground -ml-1">
              @ {new Date().getFullYear()} Zemenay Tech Solutions. All rights reserved.
            </span>
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
  );
}
