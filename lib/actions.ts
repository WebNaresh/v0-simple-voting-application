"use server"

import { revalidatePath } from "next/cache"
import dbConnect from "@/lib/db-connection"
import { Candidate, type CandidateType } from "@/models/candidate"

export async function addCandidate(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!name || name.trim() === "") {
    return { error: "Candidate name is required" }
  }

  try {
    await dbConnect()

    const newCandidate = new Candidate({
      name,
      description: description || "",
      votes: 0,
    })

    await newCandidate.save()

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error adding candidate:", error)
    return { error: "Failed to add candidate. Please try again." }
  }
}

export async function updateCandidate(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string

  if (!id || !name || name.trim() === "") {
    return { error: "Invalid data provided" }
  }

  try {
    await dbConnect()

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      {
        name,
        description: description || "",
      },
      { new: true, runValidators: true },
    )

    if (!updatedCandidate) {
      return { error: "Candidate not found" }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating candidate:", error)
    return { error: "Failed to update candidate. Please try again." }
  }
}

export async function deleteCandidate(id: string) {
  if (!id) {
    return { error: "Candidate ID is required" }
  }

  try {
    await dbConnect()

    const deletedCandidate = await Candidate.findByIdAndDelete(id)

    if (!deletedCandidate) {
      return { error: "Candidate not found" }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting candidate:", error)
    return { error: "Failed to delete candidate. Please try again." }
  }
}

export async function voteForCandidate(id: string) {
  if (!id) {
    return { error: "Candidate ID is required" }
  }

  try {
    await dbConnect()

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, { $inc: { votes: 1 } }, { new: true })

    if (!updatedCandidate) {
      return { error: "Candidate not found" }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error voting for candidate:", error)
    return { error: "Failed to record vote. Please try again." }
  }
}

export async function getCandidates(): Promise<{ candidates: CandidateType[] }> {
  try {
    await dbConnect()

    const candidates = await Candidate.find({}).sort({ votes: -1 })

    return { candidates: JSON.parse(JSON.stringify(candidates)) }
  } catch (error) {
    console.error("Error fetching candidates:", error)
    return { candidates: [] }
  }
}
