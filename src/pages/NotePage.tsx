import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { useNotes } from "../context/NotesContext";

function NotePage() {
  // Load note data for view/edit modes
  useEffect(() => {}, []);

  const handleSubmit = () => {};

  const mode = "";
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
                    onClick={() => {}}
                  >
                    {/* FaArrowLeft icon with text here  */}
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={() => {}}>
                    {/* FaEdit icon with text here */}
                  </button>
                </div>
                <h1 className="card-title mb-3">{/* {title text here} */}</h1>
                <h5 className="card-subtitle mb-4 text-muted">
                  {/* {subheading text here} */}
                </h5>
                <div className="card-text">
                  <p style={{ whiteSpace: "pre-wrap" }}>
                    {/* {content text here} */}
                  </p>
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
                {/* Add or edit mode title here  */}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    {/* Title text here  */}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    // set title value here
                    value={""}
                    // onChange event here
                    onChange={() => {}}
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
                    // set subheading here
                    value={""}
                    // onChange evebt here
                    onChange={() => {}}
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
                    // set content here
                    value={""}
                    // onChange event here
                    onChange={() => {}}
                    required
                  ></textarea>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {/* Add or update note here  */}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {}}
                  >
                    {/* Cancel text here  */}
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
