import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import noteService from "./services/notes";

import Note from "./components/Note";
import Notification from './components/Notification';

export type TNote = {
  content: string;
  important: boolean;
  id: string;
};

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState<TNote[]>([]);
  const [newNote, setNewNote] = useState<TNote["content"]>("");
  const [showAll, setShowAll] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note?.important };

    noteService
      .update(id, changedNote)
      .then((res) => {
        setNotes(notes.map((n) => (n.id !== id ? n : res)));
      })
      .catch((error) => {
        setErrorMessage(`Note '${note?.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  useEffect(() => {
    noteService.getAll().then((res) => setNotes(res));
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject: TNote = {
      content: newNote,
      important: Math.random() < 0.5,
      id: (notes.length + 1).toString(),
    };
    noteService.create(noteObject).then((res) => {
      setNotes(notes.concat(res));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow?.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit" disabled={newNote?.length === 0}>
          save
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
