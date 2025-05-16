"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

export function Header({
  studentName,
  projectGuide,
  projectTitle,
}: {
  studentName: string
  projectGuide: string
  projectTitle: string
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">VS</span>
              </div>
              <span className="font-bold text-xl">{projectTitle}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              <span>{studentName}</span> • <span>{projectGuide}</span>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 md:hidden">
            <div className="space-y-4">
              <div>
                <div className="font-bold">{projectTitle}</div>
                <div className="text-sm text-muted-foreground">
                  <div>{studentName}</div>
                  <div>{projectGuide}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  setMobileMenuOpen(false)
                }}
              >
                Home
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  const candidatesSection = document.getElementById("candidates-section")
                  if (candidatesSection) {
                    candidatesSection.scrollIntoView({ behavior: "smooth" })
                  }
                  setMobileMenuOpen(false)
                }}
              >
                Candidates
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
