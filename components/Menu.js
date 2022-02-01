import { NotesModalContext } from "./App";
import { useContext } from "react";

function Menu() {
  const { setModalNoteId, setModalNoteTitle, setModalNoteDescription, setModalShow } =
    useContext(NotesModalContext);

  function createNoteFn() {
    setModalNoteId(0);
    setModalNoteTitle("");
    setModalNoteDescription("");
    setModalShow(true);
  }
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid ">
        <a className="navbar-brand">My Notes</a>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <button
          className="btn btn-primary"
          type="button"
          onClick={createNoteFn}
        >
          Add Notes
        </button>
      </div>
    </nav>
  );
}

export default Menu;
