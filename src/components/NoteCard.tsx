import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../context/NotesContext";
import type { Note } from "../context/NotesContext";

interface NoteProps {
  note: Note;
}

function NoteCard({ note }: NoteProps) {
  const { deleteNote } = useNotes();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/note/${note.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${note.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id);
    }
  };

  return (
    <div
      className="card shadow-sm h-100"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{note.title}</h5>
          <div className="d-flex gap-2">
            <FaEdit
              className="text-primary"
              role="button"
              onClick={handleEdit}
              style={{ cursor: "pointer" }}
            />
            <FaTrash
              className="text-danger"
              role="button"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <h6 className="card-subtitle mb-3 text-muted">{note.subheading}</h6>
        <p className="card-text">{note.content}</p>
      </div>
    </div>
  );
}

export default NoteCard;
