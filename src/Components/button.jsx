import React, { useState } from "react";
import Notes from "./notes";

function Button()
{

    const [notes, setNotes] = useState([])
    function addNote() {
        setNotes([
            ...notes,
            {
                id: Date.now(),
            },
        ])
    }
    function removeNote(noteId) {
        setNotes(notes.filter((item) => item.id !== noteId))
    }
    return <button className="add-button" onClick={addNote}>+</button>
        {notes.map((item) => (
            <Notes key={item.id} onClose={() => removeNote(item.id)} />
        ))}
    
}

export default Button;