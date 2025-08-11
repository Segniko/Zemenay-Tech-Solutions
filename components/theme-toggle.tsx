"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = (resolvedTheme ?? theme) === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 bg-transparent"
      onClick={() => {
        // Trigger theme change
        setTheme(isDark ? "light" : "dark")
        
        // Force reflow to ensure smooth transition
        document.documentElement.offsetHeight
      }}
      aria-label="Toggle theme"
    >
      {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
