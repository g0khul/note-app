/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Note {
  id: number;
  title: string;
  subheading: string;
  content: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, "id">) => void;
  deleteNote: (id: number) => void;
  updateNote: (id: number, note: Omit<Note, "id">) => void;
  getNote: (id: number) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Learn React",
      subheading: "Frontend Development",
      content: "Understand components, props, and state deeply.",
    },
    {
      id: 2,
      title: "Practice TypeScript",
      subheading: "Programming Language",
      content: "Work with interfaces and generics in a React context.",
    },
    {
      id: 3,
      title: "Setup Bootstrap",
      subheading: "CSS Framework",
      content: "Integrate Bootstrap styles in a React + TS app.",
    },
  ]);

  const addNote = (note: Omit<Note, "id">) => {
    const newNote: Note = {
      ...note,
      id: Date.now(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = (id: number, updatedNote: Omit<Note, "id">) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...updatedNote, id } : note))
    );
  };

  const getNote = (id: number) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
}
