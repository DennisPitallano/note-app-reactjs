import NoteModalHeader from "./NotesModalHeader";
import NotesModalBody from "./NotesModalBody";
import NotesModalFooter from "./NotesModalFooter";
import {NotesModalContext}  from "../App";
import {useContext} from "react";
import NotesModalTags from "./NotesModalTags";

function NotesModal() {
  const {modalShow} = useContext(NotesModalContext);
  
  let cssShowHide = 
  modalShow && modalShow === true ? "modal show-modal" : "modal hide-modal";

  return(
    <>
      <style jsx>
        {`
          .show-modal {
            display: block;
          }
          .hide-modal {
            display: none;
          }
        `}
      </style>
      <div className={cssShowHide} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <NoteModalHeader />
            <NotesModalBody />
            <NotesModalTags />
            <NotesModalFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesModal;
