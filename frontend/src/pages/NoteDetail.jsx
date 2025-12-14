import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";


const NoteDetail = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        const fetchNote = async()=>{
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.error("Error fetching the note", error);
                toast.error("Failed to fetch the note");
            }finally{
                setLoading(false);
            }
        };
        fetchNote()
    },[id])

    const handleDelete = async (e)=>{
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note Deleted Successfully");
            navigate("/")
        } catch (error) {
            console.error("Error in deleting the note", error);
            toast.error("Failed to delete note");
        }
    }

    const handleSave = async (e)=>{
        e.preventDefault()

        if(!note.title.trim() || !note.content.trim()){
            toast.error("Please add a title or something");
            return;
        }
        setSaving(true);
         try {
            await api.put(`notes/${id}`, note);
            toast.success("Note Saved Successfully")
            navigate("/");
         } catch (error) {
            console.error("Error saving the note", error);
            toast.error("Failed to save the note, try again");
         }finally{
            setSaving(false);
         }
    }

    if(loading){
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        )
    }
  return (
    <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Link to="/" className="btn btn-ghost">
                        <ArrowLeftIcon className="h-5 w-5" />
                        Back to Notes
                    </Link>
                    <button onClick={handleDelete} className="btn btn-error btn-outline">
                        <Trash2Icon className="h-5 w-5" />
                        Delete Note
                    </button>
                </div>
                <div className="card bg-base-100">
                    <div className="card-body">
                        <div className="form-control mb-4">
                            <label className="label block m-2">
                                <span className="label-text">Title</span>
                            </label>
                            <input 
                                type="text" 
                                className="input input-bordered" 
                                placeholder="Note Title"
                                value = {note.title}
                                onChange={(e)=> setNote({...note, title:e.target.value})}
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label block m-2">
                                <span className="label-text">Content</span>
                            </label>
                            <textarea 
                                className="textarea textarea-bordered h-32"
                                value={note.content}
                                onChange={(e)=>setNote({...note, content:e.target.value})}
                                placeholder="Write your note here..."
                            >
                            </textarea>
                        </div>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoteDetail