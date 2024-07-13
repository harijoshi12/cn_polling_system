import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Option text is required"],
      trim: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Option", optionSchema);
