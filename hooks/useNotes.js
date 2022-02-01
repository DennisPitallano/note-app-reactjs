import notes from "../data/notes.json";
import { v4 as uuidv4 } from "uuid";
import useGeneralizedCrudMethod from "./useGeneralizedCrudMethod";

function useNotes() {
  const {
    data: notesData,
    error: notesDataError,
    createRecord: createNotesData,
    updateRecord: updateNotesData,
    deleteRecord: deleteNotesData,
  } = useGeneralizedCrudMethod(notes);

  function createNote(title, description) {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      createDate: new Date().toISOString(),
    };
    createNotesData(newNote);
  }

  function updateNote(id, title, description) {
    const updateObject = {
      id,
      title,
      description,
    };
    updateNotesData(id,updateObject);
  }

  function deleteNote(id) {
    deleteNotesData(id);
  }

  return { notesData, notesDataError, createNote, updateNote, deleteNote };
}

export default useNotes;
