import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function Notes({ note, onClose, onNameChange }) {
  const [allowMove, setAllowMove] = React.useState(false);
  const stickyNoteRef = React.useRef(null);
  const [dx, setDx] = React.useState(0);
  const [dy, setDy] = React.useState(0);
  const [name, setName] = React.useState(note.name);
  const [content, setContent] = React.useState("");

  const handleMouseDown = (e) => {
    setAllowMove(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
  };

  const handleMouseMove = (e) => {
    if (allowMove) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = `${x}px`;
      stickyNoteRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseUp = () => {
    setAllowMove(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    onNameChange(note.id, name);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const saveNoteAsFile = () => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${name}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="Sticky-Notes" ref={stickyNoteRef}>
      <div
        className="Sticky-Notes-Header"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          className="note-title"
        />
        <button className="save-button" onClick={saveNoteAsFile}>
          <FontAwesomeIcon icon={faDownload} />
        </button>
        <div className="close" onClick={onClose}>
          <h1>x</h1>
        </div>
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Enter your note here..."
      />
    </div>
  );
}

export default Notes;
