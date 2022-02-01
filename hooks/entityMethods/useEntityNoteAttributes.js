import { v4 as uuidv4 } from "uuid";
import noteAttributes from "../../data/noteAttributes.json";
import useGeneralizedCrudMethod from "../useGeneralizedCrudMethod";

function useEntityNoteAttributes() {
  const { data, error, createRecord, updateRecord, deleteRecord } =
    useGeneralizedCrudMethod(noteAttributes);

  function createNoteAttributesEntity(noteId, pinned, important) {
    createRecord({
      id: uuidv4(),
      noteId: noteId,
      pinned: pinned === undefined ? undefined : Number(pinned),
      important: important === undefined ? undefined : Number(important),
      dateUpdate: new Date().toISOString(),
    });
  }

  function updateNoteAttributesEntity(noteId, pinned, important) {
    const noteAttributes = data.find((rec) => rec.noteId === noteId);
    if (noteAttributes) {
      updateRecord(noteAttributes.id, {
        pinned: pinned === undefined ? undefined : Number(pinned),
        important: important === undefined ? undefined : Number(important),
        updateDate: new Date().toISOString(),
      });
    } else {
      createNoteAttributesEntity(noteId, pinned, important);
    }
  }

  function deleteNoteAttributesEntity(noteId) {
    data
      .filter((rec) => rec.noteId === noteId)
      .forEach((rec) => {
        deleteRecord(rec.id);
      });
  }

  return {
    data,
    error,
    updateNoteAttributesEntity,
    deleteNoteAttributesEntity,
  };
}

export default useEntityNoteAttributes;
