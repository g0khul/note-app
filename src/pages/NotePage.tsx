import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { useNotes } from "../context/NotesContext";

function NotePage() {
  const { id } = useParams();
  const { getNote, addNote, updateNote } = useNotes();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine mode based on URL path
  const mode = location.pathname.startsWith("/add")
    ? "add"
    : location.pathname.includes("/edit/")
    ? "edit"
    : "view";

  const [title, setTitle] = useState("");
  const [subheading, setSubheading] = useState("");
  const [content, setContent] = useState("");

  // Load note data for view/edit modes
  useEffect(() => {
    if ((mode === "view" || mode === "edit") && id) {
      const note = getNote(Number(id));
      if (note) {
        setTitle(note.title);
        setSubheading(note.subheading);
        setContent(note.content);
      } else {
        navigate("/");
      }
    }
  }, [id, mode, getNote, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim() && subheading.trim() && content.trim()) {
      if (mode === "add") {
        addNote({ title, subheading, content });
      } else if (mode === "edit" && id) {
        updateNote(Number(id), { title, subheading, content });
      }
      navigate("/");
    }
  };

  // View mode - read-only display
  if (mode === "view") {
    return (
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => navigate("/")}
                  >
                    <FaArrowLeft className="me-2" />
                    Back
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/edit/${id}`)}
                  >
                    <FaEdit className="me-2" />
                    Edit
                  </button>
                </div>
                <h1 className="card-title mb-3">{title}</h1>
                <h5 className="card-subtitle mb-4 text-muted">{subheading}</h5>
                <div className="card-text">
                  <p style={{ whiteSpace: "pre-wrap" }}>{content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add/Edit mode - form
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {mode === "add" ? "Add New Note" : "Edit Note"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subheading" className="form-label">
                    Subheading
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subheading"
                    value={subheading}
                    onChange={(e) => setSubheading(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {mode === "add" ? "Add Note" : "Update Note"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotePage;
