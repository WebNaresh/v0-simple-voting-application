// Simple in-memory database for testing purposes

export type Candidate = {
  id: string
  name: string
  description: string
  votes: number
}

type Database = {
  candidates: Candidate[]
}

// Initialize with some sample data
export const db: Database = {
  candidates: [
    {
      id: "1",
      name: "John Doe",
      description: "Computer Science Department Representative",
      votes: 5,
    },
    {
      id: "2",
      name: "Jane Smith",
      description: "Student Council President Candidate",
      votes: 3,
    },
    {
      id: "3",
      name: "Alex Johnson",
      description: "Cultural Committee Head",
      votes: 7,
    },
  ],
}
