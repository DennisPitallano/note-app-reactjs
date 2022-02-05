import useNotes from "../hooks/useNotes";
import NoteList from "./NoteList";
import Menu from "./Menu";
import { createContext, useState } from "react";
import useNotesModal from "../hooks/useNotesModal";
import LoaderPlaceHolder from "./Loader";
import NoteChangeLogs from "./NoteChangeLogs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  modalNoteTagIds: [],
  setModalNoteTagIds: () => {},
  tagNamesNewValue: "",
  setTagNamesNewValue: () => {},
});

function App() {
  function errorNotificationFn(errorMessage) {
    toast.error(errorMessage);
    console.log("App: Error", errorMessage);
  }

  const contextValue = useNotes(errorNotificationFn);
  const contextValueNoteModal = useNotesModal();
  const [currentTab, setCurrentTab] = useState("notes"); //["notes","logs"]
  if (contextValue.notesDataError) {
    return <div className="container">error:{notesDataError}</div>;
  }
  if (!contextValue.notesData) {
    return <LoaderPlaceHolder />;
  }

  return (
    <div className="container">
      <NotesContext.Provider value={contextValue}>
        <NotesModalContext.Provider value={contextValueNoteModal}>
          <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab === "notes" && <NoteList />}
          {currentTab === "logs" && <NoteChangeLogs />}
        </NotesModalContext.Provider>
      </NotesContext.Provider>
      <ToastContainer />
    </div>
  );
}
export default App;
