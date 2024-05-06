import React, { useEffect, useState, useRef } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";

import Note from "./components/Note";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable, { VisibilityHandle } from "./components/Togglable";
import NoteForm from "./components/NoteForm";

export type TNote = {
  content: string;
  important: boolean;
  id: string;
};

export type TUser = {
  name: string;
  username: string;
  token: string;
};

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState<TNote[]>([]);
  const [showAll, setShowAll] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<TUser | null>(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const noteFormRef = useRef<VisibilityHandle>(null)

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note?.important };

    noteService
      .update(id, changedNote)
      .then((res) => {
        setNotes(notes.map((n) => (n.id !== id ? n : res)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note?.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  useEffect(() => {
    noteService.getAll().then((res) => setNotes(res));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = (event) => {
    event.preventDefault();

    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
        noteService.setToken(user.token);
        setUser(user);
        setUsername("");
        setPassword("");
      })
      .catch(() => {
        setErrorMessage("Wrong credentials");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const addNote = (noteObject) => {
    noteFormRef?.current?.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const loginForm = () => (
    <div>
      <div style={{ display: loginVisible ? "none" : "" }}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      {loginVisible && (
        <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      )}
    </div>
  );

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {!user ? (
        loginForm()
      ) : (
        <div>
          <p>{user?.name} logged-in</p>
          {noteForm()}
        </div>
      )}
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
      <Footer />
    </div>
  );
};

export default App;
