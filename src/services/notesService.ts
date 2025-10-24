import type { Note } from "../context/NotesContext";

const API_BASE_URL = "https://notes-app.free.beeceptor.com";

export const notesService = {
  // Fetch all notes from the API
  getAllNotes: async (): Promise<Note[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/all-notes`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Extract and sanitize data from API response format: { message: "...", data: [...] }
      if (result && typeof result === "object" && "data" in result && Array.isArray(result.data)) {
        return result.data;
      }

      // Fallback: return empty array if format is unexpected
      return [];
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  // Add a new note to the API
  addNote: async (note: Note): Promise<Note> => {
    try {
      const response = await fetch(`${API_BASE_URL}/add-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Return the created note from response
      if (result && typeof result === "object" && "data" in result) {
        return result.data;
      }

      // Fallback: return the note that was sent
      return note;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  },

  // Update an existing note via API
  updateNote: async (id: number, note: Omit<Note, "id">): Promise<Note> => {
    const updatedNote: Note = { ...note, id };

    try {
      const response = await fetch(`${API_BASE_URL}/update-note`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Return the updated note from response
      if (result && typeof result === "object" && "data" in result) {
        return result.data;
      }

      // Fallback: return the note that was sent
      return updatedNote;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },
};
