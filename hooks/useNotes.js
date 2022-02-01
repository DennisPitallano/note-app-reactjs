import notes from "../data/notes.json";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";

function useNotes() {
  const [notesData, setNotesData] = useState();
  const [notesDataError, setNotesDataError] = useState();
  useEffect(() => {
    async function getData() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        setNotesData(notes);
      } catch (error) {
        setNotesDataError(error);
      }
    }
    getData();
  },[]);

  function createNote(title, description) {
    const newNote = {
      id: uuidv4(),
      title,
      description,
      createDate: new Date().toISOString(),
    };
    setNotesData((oldNotes) => {
      return [...oldNotes, newNote];
    });
  }

  function updateNote(id,title,description) {
      setNotesData(function (origState){
        return origState.map(function (rec) {
          return rec.id != id?rec:{
            ...rec,
            title:title?title:rec.title,
            description: description? description: rec.description,
          };
        });
      });
  }

  function deleteNote(id) {
      setNotesData(function(origState){
        return origState.filter(function(rec){
          return rec.id != id;
        });
      });
  }

  return { notesData, notesDataError, createNote, updateNote, deleteNote };
}

export default useNotes;
