"use client"

import type React from "react"

import { useState } from "react"
import type { Candidate } from "@/lib/db"
import { updateCandidate } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface EditCandidateFormProps {
  candidate: Candidate
  onCancel: () => void
}

export function EditCandidateForm({ candidate, onCancel }: EditCandidateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: candidate.name,
    description: candidate.description,
  })
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await updateCandidate(formData)

      if (result.success) {
        toast({
          title: "Candidate Updated",
          description: "The candidate has been successfully updated.",
        })
        onCancel()
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
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card className="border-primary/20 shadow-md">
        <CardHeader className="bg-primary/5 dark:bg-primary/10">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Edit Candidate</CardTitle>
              <CardDescription>Update the candidate's information.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <input type="hidden" name="id" value={candidate.id} />
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">
                Candidate Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter candidate name"
                required
                className="transition-all focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter candidate description or position"
                rows={3}
                className="resize-none transition-all focus-visible:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 bg-muted/30 pt-2">
            <Button type="button" variant="outline" onClick={onCancel} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
