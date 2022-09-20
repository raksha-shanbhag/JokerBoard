import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    // to empty new note block
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <textarea
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Riddle"
          rows="5"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Answer"
          style={{borderStyle: "dotted dashed", padding: "10px"}}
        />
        <button onClick={submitNote}>+</button>
      </form>
    </div>
  );
}

export default CreateArea;
