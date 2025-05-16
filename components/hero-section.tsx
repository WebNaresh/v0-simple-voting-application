"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 animate-fade-in">
            First Year MCA DBS Lab Project
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Digital <span className="text-primary">Voting</span> System
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg">
            A simple, secure, and transparent way to conduct elections and gather opinions through digital voting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" onClick={scrollToContent} className="group">
              Get Started
              <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToContent}>
              View Candidates
            </Button>
          </div>
        </div>
        <div className="relative h-auto md:h-auto bg-gradient-to-r from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 p-6 rounded-lg border shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">KG</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Komal Ghadge</h3>
                <p className="text-muted-foreground">First Year MCA Student</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Project Details</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Project Guide:</span>
                  <span>Mrs. Pratibha Adkar</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Course:</span>
                  <span>Database Systems Lab</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Submission Date:</span>
                  <span>May 16, 2025</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                This voting application demonstrates CRUD operations for database management, allowing users to create,
                read, update, and delete candidate information, as well as cast votes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
    </div>
  )
}
