import { NextResponse } from "next/server"
import dbConnect from "@/lib/db-connection"
import { Candidate } from "@/models/candidate"

export async function GET() {
  try {
    await dbConnect()

    const candidates = await Candidate.find({}).sort({ votes: -1 })

    return NextResponse.json({ candidates })
  } catch (error) {
    console.error("Error fetching candidates:", error)
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 })
  }
}
