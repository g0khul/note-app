/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { notesService } from "../services/notesService";

export interface Note {
  id: number;
  title: string;
  subheading: string;
  content: string;
}

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  error: string | null;
  addNote: (note: Omit<Note, "id">) => Promise<void>;
  deleteNote: (id: number) => void;
  updateNote: (id: number, note: Omit<Note, "id">) => Promise<void>;
  getNote: (id: number) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes from API on mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedNotes = await notesService.getAllNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError("Failed to load notes. Please try again later.");
        console.error("Error loading notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (note: Omit<Note, "id">) => {
    const newNote: Note = {
      ...note,
      id: Date.now(),
    };

    try {
      await notesService.addNote(newNote);
      setNotes([newNote, ...notes]);
    } catch (error) {
      console.error("Failed to add note:", error);
      throw error;
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateNote = async (id: number, updatedNote: Omit<Note, "id">) => {
    try {
      await notesService.updateNote(id, updatedNote);
      setNotes(
        notes.map((note) => (note.id === id ? { ...updatedNote, id } : note))
      );
    } catch (error) {
      console.error("Failed to update note:", error);
      throw error;
    }
  };

  const getNote = (id: number) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        addNote,
        deleteNote,
        updateNote,
        getNote,
      }}
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
