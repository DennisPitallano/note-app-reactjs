import noteOnTags from "../../data/noteOnTags.json";
import { v4 as uuidv4 } from "uuid";
import useGeneralizedCrudMethod from "../useGeneralizedCrudMethod";

function useEntityNoteOnTags() {
  const { data, error, createRecord, deleteRecord } =
    useGeneralizedCrudMethod(noteOnTags);

  function updateNoteTags(tagIdsToSet, noteId) {
    const tagIdsOnNote = data
      .filter((rec) => rec.noteId === noteId)
      .map((rec) => rec.tagId);
    const tagIdsToAdd = tagIdsToSet.filter(
      (tagId) => !tagIdsOnNote.includes(tagId)
    );
    const tagIdsToDelete = tagIdsOnNote.filter(
      (tagId) => !tagIdsToSet.includes(tagId)
    );
    tagIdsToAdd.forEach((tagId) => {
      createRecord({
        id: uuidv4(),
        noteId,
        tagId,
        createDate: new Date().toISOString(),
      });
    });

    const noteOnTagRecIdsToDelete = data
      .filter(
        (rec) => rec.noteId === noteId && tagIdsToDelete.includes(rec.tagId)
      )
      .map((rec) => rec.id);
    noteOnTagRecIdsToDelete.forEach((id) => {
      deleteRecord(id);
    });
  }

  function deleteNoteOnTagsByNoteId(noteId) {
    data.forEach((rec) => {
      if (rec.noteId === noteId) {
        deleteRecord(rec.id);
      }
    });
  }

  return { data, error, updateNoteTags,deleteNoteOnTagsByNoteId };
}

export default useEntityNoteOnTags;
