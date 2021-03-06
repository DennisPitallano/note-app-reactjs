import useEntityNotes from "./entityMethods/useEntityNotes";
import useEntityNoteAttributes from "./entityMethods/useEntityNoteAttributes";
import useEntityNoteChangeLogs from "./entityMethods/useEntityNoteChangeLogs";
import useEntityTags from "./entityMethods/useEntityTags";
import useEntityNoteOnTags from "./entityMethods/useEntityNoteOnTags";

function useNotes(errorNotificationFn) {
  const {
    data: notesData,
    error: notesDataError,
    createNoteEntity,
    updateNoteEntity,
    deleteNoteEntity,
  } = useEntityNotes("/api/notes",errorNotificationFn);
  const {
    data: noteAttributesData,
    error: noteAttributesDataError,
    updateNoteAttributesEntity,
    deleteNoteAttributesEntity,
  } = useEntityNoteAttributes("/api/noteAttributes",errorNotificationFn);
  const {
    data: noteChangeLogsData,
    error: noteChageLogsDataError,
    createNoteChangeLogsEntity,
  } = useEntityNoteChangeLogs("/api/noteChangeLogs",errorNotificationFn);

  const {
    data: tagsData,
    error: tagsDataError,
    createTagsAndMerge,
  } = useEntityTags("/api/tags",errorNotificationFn);

  const {
    data: noteOnTagsData,
    error: noteOnTagsDataError,
    updateNoteTags,
    deleteNoteOnTagsByNoteId,
  } = useEntityNoteOnTags("/api/noteOnTags",errorNotificationFn);

  function createNote(title, description, tagIdsIn, tagNamesIn) {
    const noteId = createNoteEntity(title, description);
    createNoteChangeLogsEntity(noteId, "CREATE");
    const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);
    updateNoteTags(tagIds, noteId);
  }
  function updateNote(id, title, description, pinned, important,tagIdsIn,tagNamesIn) {
    updateNoteEntity(id, title, description);
    updateNoteAttributesEntity(id, pinned, important);
    createNoteChangeLogsEntity(id, "UPDATE");
    const tagIds = createTagsAndMerge(tagIdsIn,tagNamesIn);
    updateNoteTags(tagIds,id);
  }
  function deleteNote(id) {
    deleteNoteEntity(id);
    deleteNoteAttributesEntity(id);
    deleteNoteOnTagsByNoteId(id);
  }

  return {
    notesData,
    notesDataError,
    noteAttributesData,
    noteAttributesDataError,
    noteChangeLogsData,
    noteChageLogsDataError,
    tagsData,tagsDataError,
    noteOnTagsData,
    noteOnTagsDataError,
    createNote,
    updateNote,
    deleteNote,
  };
}

export default useNotes;
