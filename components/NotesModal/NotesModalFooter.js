import { NotesModalContext, NotesContext } from "../App";
import { useContext } from "react";

function NotesModalFooter() {
  const { modalNoteId, setModalShow, modalNoteTitle, modalNoteDescription } =
    useContext(NotesModalContext);
  const { createNote, updateNote } = useContext(NotesContext);
  return (
    <div className="modal-footer">
      {modalNoteId !== 0 && (
        <button
          type="button"
          onClick={() => {
            updateNote(modalNoteId, modalNoteTitle, modalNoteDescription);
            setModalShow(false);
          }}
          className="btn btn-primary"
        >
          Save changes
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          setModalShow(false);
        }}
        className="btn btn-secondary"
        data-dismiss="modal"
      >
        Discard
      </button>
      {modalNoteId === 0 && (
        <button
          type="button"
          onClick={() => {
            createNote(modalNoteTitle,modalNoteDescription);
            setModalShow(false);
          }}
          className="btn btn-info"
          data-dismiss="modal"
        >
          Add
        </button>
      )}
    </div>
  );
}

export default NotesModalFooter;
