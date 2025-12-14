import Note from "../models/Note.js";

export async function getAllNotes(_, res){
    try {
        const notes = await Note.find().sort({createdAt: -1});// Latest note will be displyed first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes Controller", error);
        res.status(500).json({message: "Internel Server Error"});
    }
};

export async function createANote(req, res){
    try {
        const {title, content} = req.body;
        const note = new Note({title:title, content:content});
        const savedNote = await note.save()
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createANote Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function updateANote(req, res){
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title:title, content:content}, {new: true});
        if(!updatedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateANote", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function deleteANote(req, res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json(deletedNote);
    } catch (error) {
        console.error("Error in deleteANote", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({messsage: "Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}