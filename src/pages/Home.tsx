import { useState } from "react";
import NoteCard from "../components/NoteCard";
import { useNotes } from "../context/NotesContext";

function Home() {
  const { notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.subheading.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container my-4">
      <h2 className="mb-4">My Notes</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search notes by title, subheading, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {notes.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No notes yet. Click "Add Note" to create your first note!
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          No notes found matching "{searchQuery}". Try a different search term.
        </div>
      ) : (
        <div className="row g-3">
          {filteredNotes.map((note) => (
            <div className="col-12 col-md-6 col-lg-4" key={note.id}>
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
