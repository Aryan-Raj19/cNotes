import { useEffect, useState } from "react";
import API from "../services/api";
import NoteCard from "../components/NoteCard";

export default function Trash() {
  const [trashedNotes, setTrashedNotes] = useState([]);

  useEffect(() => {
    API.get("/notes/trash").then((res) => setTrashedNotes(res.data));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {trashedNotes.length === 0 ? (
        <p className="text-center col-span-full">Trash is empty</p>
      ) : (
        trashedNotes.map((note) => <NoteCard key={note._id} note={note} />)
      )}
    </div>
  );
}
