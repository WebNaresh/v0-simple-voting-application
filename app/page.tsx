import { Candidates } from "@/components/candidates"
import { AddCandidateForm } from "@/components/add-candidate-form"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header studentName="Komal Ghadge" projectGuide="Mrs. Pratibha Adkar" projectTitle="Voting Application" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <HeroSection />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <AddCandidateForm />
          </div>
          <div className="md:col-span-2">
            <Candidates />
          </div>
        </div>
      </div>
    </main>
  )
}
