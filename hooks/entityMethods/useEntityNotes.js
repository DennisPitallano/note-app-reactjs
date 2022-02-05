import useGeneralizedCrudMethod from "../useGeneralizedCrudMethod";
import { v4 as uuidv4 } from "uuid";

function useEntityNotes(url,errorNotificationFn) {
  const { data, error, createRecord, updateRecord, deleteRecord } =
    useGeneralizedCrudMethod(url,errorNotificationFn);

  function createNoteEntity(title, description) {
    const noteId = uuidv4();
    const newNote = {
      id: noteId,
      title,
      description,
      createDate: new Date().toISOString(),
    };
    createRecord(newNote);
    return noteId;
  }

  function updateNoteEntity(id, title, description) {
    const updateObject = {
      id,
      title,
      description,
    };
    updateRecord(id, updateObject);
  }

  function deleteNoteEntity(id) {
    deleteRecord(id);
  }

  return { data, error, createNoteEntity, updateNoteEntity, deleteNoteEntity };
}
export default useEntityNotes;
