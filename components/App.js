import useNotes from "../hooks/useNotes";
import NoteList from "./NoteList";
import Menu from "./Menu";
import { createContext } from "react";
import useNotesModal from "../hooks/useNotesModal";
import LoaderPlaceHolder from "./Loader";

export const NotesContext = createContext({
  notesData: [],
  notesDataError: "",
  noteAttributesData: [],
  createNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
});

export const NotesModalContext = createContext({
  modalShow: false,
  setModalShow: () => {},
  modalNoteId: 0,
  setModalNoteId: () => {},
  modalNoteTitle: "",
  setModalNoteTitle: () => {},
  modalNoteDescription: "",
  setModalNoteDescription: () => {},
});

function App() {
  const contextValue = useNotes();
  const contextValueNoteModal = useNotesModal();
  if (contextValue.notesDataError) {
    return <div className="container">error:{notesDataError}</div>;
  }
  if (!contextValue.notesData) {
    return (
      <LoaderPlaceHolder/>
    );
  }

  return (
    <div className="container">
      <NotesContext.Provider value={contextValue}>
        <NotesModalContext.Provider value={contextValueNoteModal}>
          <Menu />
          <NoteList />
        </NotesModalContext.Provider>
      </NotesContext.Provider>
    </div>
  );
}
export default App;
