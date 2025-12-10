import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    docname:{
      type: String,
      required: true
    },
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
    sessionId:{
      type: String
    }
  },
  { timestamps: true }
);

// If deleting doc.remove() or doc.deleteOne()
documentSchema.pre("deleteOne", { document: true, query: false }, async function () {
  await mongoose.model("Block").deleteMany({ _id: { $in: this.blocks } });
});

// If deleting using findByIdAndDelete() or findOneAndDelete()
documentSchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await mongoose.model("Block").deleteMany({ _id: { $in: doc.blocks } });
  }
});


const Document = mongoose.model("Document", documentSchema);

export default Document;
