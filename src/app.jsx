import Notes from "./Components/notes";
import Header from "./Components/Header";
import React, { useState } from "react";
import Footer from "./Components/Footer";

function App() {
    const [notes, setNotes] = useState([]);
    const [noteCount, setNoteCount] = useState(0);

    function addNote() {
        setNoteCount(noteCount + 1);
        setNotes([
            ...notes,
            {
                id: Date.now(),
                name: `Note ${noteCount + 1}`,
            },
        ]);
    }

    function removeNote(noteId) {
        setNotes(notes.filter((item) => item.id !== noteId));
    }

    function updateNoteName(noteId, newName) {
        setNotes(notes.map(note => note.id === noteId ? { ...note, name: newName } : note));
    }

    return (
        <div>
            <Header />
            <button className="add-button" onClick={addNote}>+</button>
            {notes.map((item) => (
                <Notes key={item.id} note={item} onClose={() => removeNote(item.id)} onNameChange={updateNoteName} />
            ))}
            <Footer />
        </div>
    );
}

export default App;
