// This file is kept for backward compatibility
// The actual data now comes from MongoDB

export type Candidate = {
  id: string
  name: string
  description: string
  votes: number
}

// This is just a fallback in case the MongoDB connection fails
export const db = {
  candidates: [] as Candidate[],
}
