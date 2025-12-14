import React,{useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import  { toast } from 'react-hot-toast';
import api from '../lib/axios';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const Homepage = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchNotes = async () => {
            try {
                // using axios 
                const res = await api.get("/notes");
                setNotes(res.data);
                // using fetch api
                // const res = await fetch("https://localhost:5001/api/notes");
                // const data = await res.json();
                // console.log(data);
            } catch (error) {
                console.error("Error fetching notes", error);
                toast.error("Failed to load notes");
            } finally{
                setLoading(false);
            }
        }
        fetchNotes();
    }, [])

  return (
    <div className='min-h-screen'>
        <Navbar />
        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}

            {notes.length === 0 && <NotesNotFound />}

            {notes.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map((note) => (
                        <div>
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Homepage