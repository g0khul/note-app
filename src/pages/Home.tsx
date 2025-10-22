import NoteCard from "../components/NoteCard";

function Home() {
  const notes = [
    {
      id: 1,
      title: "Learn React",
      content: "Understand components, props, and state deeply.",
      createdAt: "2025-10-20",
    },
    {
      id: 2,
      title: "Practice TypeScript",
      content: "Work with interfaces and generics in a React context.",
      createdAt: "2025-10-21",
    },
    {
      id: 3,
      title: "Setup Bootstrap",
      content: "Integrate Bootstrap styles in a React + TS app.",
      createdAt: "2025-10-22",
    },
    {
      id: 4,
      title: "Build Todo App",
      content: "Implement CRUD with mock API and routing.",
      createdAt: "2025-10-23",
    },
    {
      id: 5,
      title: "Polish UI",
      content: "Add responsiveness and better UX.",
      createdAt: "2025-10-24",
    },
  ];

  return (
    <div>
      <div className="container my-4">
        <h2 className="mb-3">My Notes</h2>
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4 mb-3" key={note.id}>
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
