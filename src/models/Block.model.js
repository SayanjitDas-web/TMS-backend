import mongoose,{ Schema } from "mongoose";

const blockSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    explaination:{
        type: String,
        required: true
    },
},{timestamps: true})

const Block = mongoose.model("Block",blockSchema)

export default Block