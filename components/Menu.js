import { NotesModalContext } from "./App";
import { useContext } from "react";

function Menu({ currentTab, setCurrentTab }) {
  const {
    setModalNoteId,
    setModalNoteTitle,
    setModalNoteDescription,
    setModalShow,
  } = useContext(NotesModalContext);

  function createNoteFn() {
    setModalNoteId(0);
    setModalNoteTitle("");
    setModalNoteDescription("");
    setModalShow(true);
  }

  function TabItem({ tabValue, tabText }) {
    const tabClass = tabValue ===currentTab
      ? "btn btn-sm btn-primary mx-2 rounded-pill  rounded border border-info active"
      : "btn btn-sm bg-body mx-2 rounded-pill  ";
    return (
      <li className="nav-item">
        <a
          className={tabClass}
          aria-current="page"
          href="#"
          onClick={()=>{
            setCurrentTab(tabValue);
          }}>
          {tabText}
        </a>
      </li>
    );
  }

  function AddNoteButton() {
    return (
      <div className="d-flex">
        <button
          className="btn btn-sm btn-primary rounded-pill shadow  rounded border border-info"
          type="button"
          onClick={createNoteFn}
        >
          Add Notes
        </button>
      </div>
    );
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-pill shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            My Notes
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <TabItem tabValue="notes" tabText="All Notes" />
              <TabItem tabValue="logs" tabText="Change Logs" />
            </ul>
            {currentTab === "notes" && <AddNoteButton />}
          </div>
        </div>
      </nav>
    </>
  );
}
export default Menu;
