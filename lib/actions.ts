"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"

export async function addCandidate(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!name || name.trim() === "") {
    return { error: "Candidate name is required" }
  }

  db.candidates.push({
    id: Date.now().toString(),
    name,
    description: description || "",
    votes: 0,
  })

  revalidatePath("/")
  return { success: true }
}

export async function updateCandidate(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!id || !name || name.trim() === "") {
    return { error: "Invalid data provided" }
  }

  const candidateIndex = db.candidates.findIndex((c) => c.id === id)

  if (candidateIndex === -1) {
    return { error: "Candidate not found" }
  }

  db.candidates[candidateIndex] = {
    ...db.candidates[candidateIndex],
    name,
    description: description || "",
  }

  revalidatePath("/")
  return { success: true }
}

export async function deleteCandidate(id: string) {
  const candidateIndex = db.candidates.findIndex((c) => c.id === id)

  if (candidateIndex === -1) {
    return { error: "Candidate not found" }
  }

  db.candidates.splice(candidateIndex, 1)

  revalidatePath("/")
  return { success: true }
}

export async function voteForCandidate(id: string) {
  const candidateIndex = db.candidates.findIndex((c) => c.id === id)

  if (candidateIndex === -1) {
    return { error: "Candidate not found" }
  }

  db.candidates[candidateIndex].votes += 1

  revalidatePath("/")
  return { success: true }
}
