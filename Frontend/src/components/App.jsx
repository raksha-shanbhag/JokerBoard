import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import NewNoteCreate from "./NewNoteCreate";
import UpdatePopUp from "./UpdatePopUp";
import APIService from "../APIservice";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNote, setEditingNote] = useState({
    id : "",
    title : "",
    content : ""
  })
  const [open, setOpen] = useState(false);

  function addNewNote(newNoteBlock) {
    setNotes((prevNotes) => {
      return [newNoteBlock, ...prevNotes];
    });

    APIService.insertNote(newNoteBlock)
    .catch(error => console.log(error))
  }

  function deleteNote(blockID) {
    console.log("Try delete");
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note.id !== blockID;
      });
    });

    APIService.deleteNote(blockID)
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
  }

  function updateNote(index, content){
    console.log("edit");

    if(!content){
      content="";
    }

    setNotes((prevNotes) =>{
      let updatedNotes = [...prevNotes];
      updatedNotes[index].content = content;

      return updatedNotes;
    });

    let title = notes[index].title;
    APIService.updateNote(notes[index].id, {title, content})
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
  }

  const handleClickOpen = (noteInfo, index) => {
    setOpen(true);
    setEditingNote(noteInfo);
    setEditingNoteId(index);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingNoteId(null);
    setEditingNote({
      id : "",
      title : "",
      content : ""
    });
  };

  const handleUpdate = (content) => {
    updateNote(editingNoteId, content);
  }

  useEffect(()=>{
    APIService.getAllNotes()
    .then(resp => setNotes(resp))
    .catch(error => console.log(error))
  }, []);

  return (
    <>
      <Header />
      <NewNoteCreate onAdd={addNewNote} />

      {notes && notes.map((note, index) => { 
        return (
          <Note
            key={index}
            id={note.id}
            index={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            onEdit={updateNote}
            handleOpen={handleClickOpen}
          />
        );
      })}

      <UpdatePopUp 
        open={open} 
        title={editingNote.title}
        content={editingNote.content}
        handleClose={handleClose} 
        handleUpdate={handleUpdate} 
      />
    </>
  );
}

export default App;
