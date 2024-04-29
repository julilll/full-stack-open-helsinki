import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState();

  useEffect(() => {
    user && blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        window.localStorage.setItem(
          "loggedBlogListAppUser",
          JSON.stringify(user)
        );
        blogService.setToken(user.token);
        setUser(user);
        setUsername("");
        setPassword("");
        setNotification({ message: 'Logged-in successfully', status: 'success'})
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      })
      .catch(() => {
        setNotification({ message: 'Wrong username or password', status: 'error'})
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      });
  };

  const handleNewPost = (event) => {
    event.preventDefault();
    const newPost = { title, author, url };
    blogService
      .create(newPost)
      .then(res => {
        setBlogs(blogs.concat(res));
        setNotification({ message: `New post was added by ${author}`, status: 'success'})
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
        setTitle("");
        setAuthor("");
        setUrl("");
      })
      .catch((er) => {
        setNotification({ message: `Post is not added because of error: ${er?.response?.data?.error}`, status: 'error'})
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogListAppUser");
    setNotification({ message: 'User successfully logged-out', status: 'success'})
    setTimeout(() => {
      setNotification(undefined)
    }, 5000)
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const newBlogForm = () => (
    <form onSubmit={handleNewPost}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  const blogsList = () => (
    <div>
      <p>
        {user?.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
      {newBlogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h2>{user ? "blogs" : "log in to the application"}</h2>
      <Notification message={notification?.message} status={notification?.status}/>
      {user === null ? loginForm() : blogsList()}
    </div>
  );
};

export default App;
