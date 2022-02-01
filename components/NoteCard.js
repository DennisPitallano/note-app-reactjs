import { NotesContext, NotesModalContext } from "./App";
import { useContext } from "react";

function NoteCard({ note }) {
  const { notesData, noteAttributesData, deleteNote, updateNote } =
    useContext(NotesContext);
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

  return (
    <>
      <div className="col-md-4">
        <div className="card shadow-sm rounded">
          <div className="card-body">
            <h5 className="card-title">
              {note.title}
              <a className="position-absolute top-0 start-50 translate-middle"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
