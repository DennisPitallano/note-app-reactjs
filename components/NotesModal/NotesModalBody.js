import { NotesModalContext } from "../App";
import { useContext } from "react";

function NotesModalBody() {
    const {modalNoteTitle,setModalNoteTitle,
          modalNoteDescription, setModalNoteDescription} = useContext(NotesModalContext);
  return (
    <div className="modal-body">
      <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Title:</label>
            <input type="text" className="form-control"
             value={modalNoteTitle}
             onChange={event=>{
                setModalNoteTitle(event.target.value);
             }} />
          </div>
          <div className="form-group">
            <label htmlFor="message-text" className="col-form-label">Message:</label>
            <textarea className="form-control"
            value={modalNoteDescription}
            onChange={event=> {
                setModalNoteDescription(event.target.value);
            }}>
            </textarea>
          </div>
        </form>
    </div>
  );
}
export default NotesModalBody;
