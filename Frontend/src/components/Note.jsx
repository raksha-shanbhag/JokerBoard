import React from "react";

function Note(props) {
  // update callback 
  function handleUpdate() {
    const noteInfo = {
      id : props.id,
      title : props.title,
      content : props.content
    }
    props.handleOpen(noteInfo, props.index);
  }
  
  // Delete callback
  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleUpdate} className="left"> EDIT</button>
      <button onClick={handleDelete} className="right"> DELETE</button>
    </div>
  );
}

export default Note;
