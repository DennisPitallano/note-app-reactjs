import { NotesContext, NotesModalContext} from "./App";
import {useContext} from "react";

function NoteCard({ note }) {
    const {notesData,deleteNote} = useContext(NotesContext);
    const {setModalNoteId, setModalNoteTitle, setModalNoteDescription,
    setModalShow} = useContext(NotesModalContext); 
    
    function editNoteFn(noteId) {
       const noteData = notesData.find(rec => rec.id === noteId);
       setModalNoteId(noteId);
       setModalNoteTitle(noteData.title);
       setModalNoteDescription(noteData.description);
       setModalShow(true);
    }

    function deleteNoteFn(noteId){
        deleteNote(noteId);
    }
    return (
        <div className="col-md-4 single-note-item all-category">
          <div className="card card-body">
            <div>
                <span className="side-stick">

                </span>
                <h5 className="note-title text-truncate w-75 mb-0">
                    {note.title}
                </h5>
            </div>

            <p className="note-date font-12 text-muted">
                { new Date(note.createDate).toLocaleDateString("en",{
                    year:"numeric",
                    month:"long",
                    day:"numeric",
                    hour:"2-digit",
                    minute:"2-digit"
                })}
            </p>
            <div className="note-content">
                <p className="note-inner-content text-muted">
                    {note.description}
                </p>
            </div>
            <div className="d-flex align-center-items">
                <span className="mx-1">
                    <a href="#" onClick={()=>deleteNoteFn(note.id)}>
                        <i className="fa fa-trash fa-lg"></i>
                    </a>
                </span>
                <span className="mx-1">
                    <a href="#" onClick={()=>editNoteFn(note.id)}>
                        <i className="fa fa-edit fa-lg"></i>
                    </a>
                </span>
            </div>
          </div>
        </div>
    );
}

export default NoteCard;