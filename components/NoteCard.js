import { NotesContext, NotesModalContext } from "./App";
import { useContext } from "react";

function NoteCard({ note }) {
  const {
    notesData,
    noteAttributesData,
    tagsData,
    noteOnTagsData,
    deleteNote,
    updateNote,
  } = useContext(NotesContext);
  const {
    setModalNoteId,
    setModalNoteTitle,
    setModalNoteDescription,
    setModalShow,
  } = useContext(NotesModalContext);

  function editNoteFn(noteId) {
    const noteData = notesData.find((rec) => rec.id === noteId);
    setModalNoteId(noteId);
    setModalNoteTitle(noteData.title);
    setModalNoteDescription(noteData.description);
    setModalShow(true);
  }

  function deleteNoteFn(noteId) {
    deleteNote(noteId);
  }

  const noteAttributes = noteAttributesData
    ? noteAttributesData.find((rec) => rec.noteId === note.id)
    : { notePinned: 0, noteImportant: 0 };

  const notePinned = noteAttributes?.pinned === 1 ? true : false;
  const noteImportant = noteAttributes?.important === 1 ? true : false;
  
  const tagsDataDictionary = tagsData
  ? Object.fromEntries(tagsData.map(({id,tagName}) => [id,tagName]))
  :[];

  const noteTags = noteOnTagsData
    ? noteOnTagsData
        .filter((r) => r.noteId === note.id)
        .map((r) => {
          return {
            ...r,
            tagName: tagsDataDictionary[r.tagId],
          };
        })
    : [];

  function NoteTagsSection() {
    return (
      <div className="row margin-left-right-15">
        {noteTags
          .sort(function (a, b) {
            const textA = a?.tagName?.toUpperCase();
            const textB = b?.tagName?.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
          .map((noteTag) => {
            return (
              <div key={noteTag.id}>
                <span className="badge bg-secondary">
                {noteTag.tagName}&nbsp;
                  <a className="text-warning"
                    href="#"
                    onClick={() => {
                      const tagIdsForNote = noteTags
                        .filter((rec) => rec.tagId != noteTag.tagId)
                        .map((rec) => rec.tagId);
                      updateNote(
                        note.id,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        tagIdsForNote,
                        undefined
                      );
                    }}
                  >
                    {" "}
                    <i className="icon fa fa-times-circle"></i>{" "}
                  </a>
                </span>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <>
      <div className="col-md-4">
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <h5 className="card-title">
              {note.title}
              <a
                className="position-absolute top-0 start-50 translate-middle"
                href="#"
                onClick={() => {
                  updateNote(
                    note.id,
                    undefined,
                    undefined,
                    !notePinned,
                    noteImportant
                  );
                }}
              >
                <i
                  className={
                    notePinned
                      ? " fas fa-thumbtack fa-lg text-info"
                      : " fas fa-thumbtack fa-rotate-90"
                  }
                ></i>
              </a>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {new Date(note.createDate).toLocaleDateString("en", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h6>
            <p className="card-text">{note.description}</p>
            <a
              className="card-link"
              href="#"
              onClick={() =>
                updateNote(
                  note.id,
                  undefined,
                  undefined,
                  notePinned,
                  !noteImportant
                )
              }
            >
              <i
                className={
                  noteImportant === true
                    ? "fa fa-star text-warning"
                    : "far fa-star"
                }
              ></i>
            </a>
            <a
              href="#"
              className="card-link"
              onClick={() => deleteNoteFn(note.id)}
            >
              <i className="fas fa-trash-alt text-danger"></i>
            </a>
            <a
              href="#"
              className="card-link"
              onClick={() => editNoteFn(note.id)}
            >
              <i className="fas fa-pencil-alt"></i>
            </a>
            <div className="my-2">
              <NoteTagsSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
