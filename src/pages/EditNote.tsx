import { useParams } from "react-router-dom";

function EditNote() {
  const { id } = useParams();

  return (
    <div>
      <h2>You're on the Edit Note Page</h2>
      <p>Editing note with ID: {id}</p>
    </div>
  );
}

export default EditNote;
