"use client"

import { useState, useEffect } from "react"
import type { Candidate } from "@/lib/db"
import { deleteCandidate, voteForCandidate } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, Pencil, Trash2, Award, Users } from "lucide-react"
import { EditCandidateForm } from "./edit-candidate-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export function Candidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalVotes, setTotalVotes] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCandidates = async () => {
      setIsLoading(true)
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Dynamically import the db module
        const { db } = await import("@/lib/db")
        setCandidates(db.candidates)

        // Calculate total votes
        const total = db.candidates.reduce((sum, candidate) => sum + candidate.votes, 0)
        setTotalVotes(total)
      } catch (error) {
        console.error("Error fetching candidates:", error)
        toast({
          title: "Error",
          description: "Failed to load candidates. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCandidates()
  }, [toast])

  const handleVote = async (id: string) => {
    try {
      const result = await voteForCandidate(id)
      if (result.success) {
        // Update the local state to reflect the vote
        setCandidates((prevCandidates) =>
          prevCandidates.map((candidate) =>
            candidate.id === id ? { ...candidate, votes: candidate.votes + 1 } : candidate,
          ),
        )

        // Update total votes
        setTotalVotes((prev) => prev + 1)

        toast({
          title: "Vote Recorded",
          description: "Your vote has been successfully recorded.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while voting.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteCandidate(id)
      if (result.success) {
        // Get the votes of the candidate being deleted
        const deletedCandidate = candidates.find((c) => c.id === id)
        const deletedVotes = deletedCandidate ? deletedCandidate.votes : 0

        // Update the local state to remove the deleted candidate
        setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate.id !== id))

        // Update total votes
        setTotalVotes((prev) => prev - deletedVotes)

        toast({
          title: "Candidate Deleted",
          description: "The candidate has been successfully removed.",
        })
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting.",
        variant: "destructive",
      })
    }
  }

  // Sort candidates by votes (highest first)
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes)

  // Find the candidate with the most votes
  const leadingCandidate = sortedCandidates.length > 0 ? sortedCandidates[0] : null

  if (isLoading) {
    return (
      <div className="space-y-6" id="candidates-section">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Candidates</h2>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Loading...</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-muted rounded animate-pulse mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-5 w-16 bg-muted rounded animate-pulse"></div>
                <div className="h-4 w-full bg-muted/50 rounded mt-4 animate-pulse"></div>
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/30 pt-2">
                <div className="h-9 w-20 bg-muted rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-9 w-16 bg-muted rounded animate-pulse"></div>
                  <div className="h-9 w-16 bg-muted rounded animate-pulse"></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (editingCandidate) {
    return <EditCandidateForm candidate={editingCandidate} onCancel={() => setEditingCandidate(null)} />
  }

  if (candidates.length === 0) {
    return (
      <div className="text-center p-12 border rounded-lg bg-muted/20 shadow-sm" id="candidates-section">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Candidates Yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Add your first candidate using the form to get started with the voting process.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6" id="candidates-section">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Candidates</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">{candidates.length} Candidates</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">{totalVotes} Total Votes</span>
          </div>
        </div>
      </div>

      {leadingCandidate && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full">
              <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Current Leader</h3>
              <p className="text-amber-700 dark:text-amber-400">
                {leadingCandidate.name} with {leadingCandidate.votes} votes
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {sortedCandidates.map((candidate, index) => {
          const votePercentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0
          const isLeader = leadingCandidate && candidate.id === leadingCandidate.id

          return (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden transition-all hover:shadow-md ${
                  isLeader ? "border-amber-300 dark:border-amber-700" : ""
                }`}
              >
                <CardHeader className="pb-2 relative">
                  {isLeader && (
                    <div className="absolute -right-2 -top-2 bg-amber-100 dark:bg-amber-900 p-1 rounded-full">
                      <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                  )}
                  <CardTitle className="flex items-center gap-2">{candidate.name}</CardTitle>
                  <CardDescription>{candidate.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        {candidate.votes} {candidate.votes === 1 ? "vote" : "votes"}
                      </span>
                      <span className="text-sm text-muted-foreground">{votePercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={votePercentage} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/30 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(candidate.id)}
                    className="flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Vote
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCandidate(candidate)}
                      className="flex items-center gap-1"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Candidate</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {candidate.name}? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(candidate.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
