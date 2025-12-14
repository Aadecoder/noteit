import mongoose from "mongoose";

// 1. Create a Schema
// 2. Make a Model based of that Schema

const notesSchema = new mongoose.Schema({
        title: {
            type:String,
            required: true
        },
        content: {
            type:String,
            required: true
        }
    },{timestamps: true} // createdAt and updatedAt
)

const Note = mongoose.model("Note", notesSchema);

export default Note;