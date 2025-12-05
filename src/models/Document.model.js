import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    blocks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Block",
      },
    ],
  },
  { timestamps: true }
);

documentSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  await mongoose.model("Block").deleteMany({ _id: { $in: this.blocks } });
  next();
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
