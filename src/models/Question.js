import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Question", questionSchema);
