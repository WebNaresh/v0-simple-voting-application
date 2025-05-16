import { Schema, model, models } from "mongoose"

export interface CandidateType {
  _id?: string
  id?: string
  name: string
  description: string
  votes: number
  createdAt?: Date
  updatedAt?: Date
}

const candidateSchema = new Schema<CandidateType>(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    votes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
      },
    },
  },
)

// Create or get the model
export const Candidate = models.Candidate || model<CandidateType>("Candidate", candidateSchema)
