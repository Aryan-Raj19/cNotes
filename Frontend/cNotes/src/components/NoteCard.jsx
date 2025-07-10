export default function NoteCard({ note }) {
  return (
    <div className={`p-4 rounded shadow bg-[${note.color || "#fff"}]`}>
      <h2 className="text-lg font-bold">{note.title}</h2>
      <p className="text-sm">{note.content}</p>
    </div>
  );
}
