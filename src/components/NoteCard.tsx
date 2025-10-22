import { FaEdit, FaTrash } from "react-icons/fa";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  };
}

function NoteCard({ note }: NoteProps) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <div>
            <FaEdit
              className="text-primary me-2"
              role="button"
              onClick={() =>
                console.log("Edit button for", note.id, "is clicked")
              }
            />
            <FaTrash
              className="text-danger"
              role="button"
              onClick={() =>
                console.log("Delete button for", note.id, "is clicked")
              }
            />
          </div>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">{note.createdAt}</h6>
        <p className="card-text">{note.content}</p>
      </div>
    </div>
  );
}

export default NoteCard;
