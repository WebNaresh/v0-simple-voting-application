"use client"

import type React from "react"

import { useState } from "react"
import { addCandidate } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { UserPlus, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export function AddCandidateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "" })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await addCandidate(formData)

      if (result.success) {
        toast({
          title: "Candidate Added",
          description: "The new candidate has been successfully added.",
        })

        // Reset the form
        setFormData({ name: "", description: "" })
        const form = document.getElementById("add-candidate-form") as HTMLFormElement
        form.reset()
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
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="sticky top-20 border-primary/20 shadow-sm">
        <CardHeader className="bg-primary/5 dark:bg-primary/10">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Add New Candidate</CardTitle>
              <CardDescription>Create a new candidate for the voting system.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form id="add-candidate-form" action={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Candidate Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter candidate name"
                required
                value={formData.name}
                onChange={handleChange}
                className="transition-all focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter candidate description or position"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="resize-none transition-all focus-visible:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-2">
            <Button type="submit" disabled={isSubmitting} className="w-full transition-all">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Candidate
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
