import { NotesModalContext } from "../App";
import { useContext } from "react";

function NotesModalHeader() {
  const { setModalShow, modalNoteId } = useContext(NotesModalContext);
  return (
    <div className="modal-header">
      <h5 className="modal-title">
        {modalNoteId === 0 ? <span>Add Note</span> : <span>Edit Note</span>}
      </h5>
      <button
        type="button"
        onClick={() => {
            setModalShow(false);
        }}
        className="btn btn-secondary"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default NotesModalHeader;
