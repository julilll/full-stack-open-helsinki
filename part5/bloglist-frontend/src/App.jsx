import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState()

  const newBlogFormRef = useRef(null)
  const newBlogFormRefFields = useRef(null)

  useEffect(() => {
    user && blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()

    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        window.localStorage.setItem(
          'loggedBlogListAppUser',
          JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        setNotification({ message: 'Logged-in successfully', status: 'success' })
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      })
      .catch(() => {
        setNotification({ message: 'Wrong username or password', status: 'error' })
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      })
  }

  const addNewPost = (newPost) => {
    blogService
      .create(newPost)
      .then(res => {
        setBlogs(blogs.concat(res))
        setNotification({ message: `New post was added by ${newPost.author}`, status: 'success' })
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
        newBlogFormRef?.current?.toggleVisibility()
        newBlogFormRefFields?.current?.clearForm()
      })
      .catch((er) => {
        setNotification({ message: `Post is not added because of error: ${er?.response?.data?.error}`, status: 'error' })
        setTimeout(() => {
          setNotification(undefined)
        }, 5000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    setNotification({ message: 'User successfully logged-out', status: 'success' })
    setTimeout(() => {
      setNotification(undefined)
    }, 5000)
    setUser(null)
  }

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
  )

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(el => el.id !== blog.id))
          setNotification({ message: 'The post was successfully removed', status: 'success' })
          setTimeout(() => {
            setNotification(undefined)
          }, 5000)
        })
        .catch((er) => {
          setNotification({ message: `Post wasn't remove because of error: ${er?.response?.data?.error}`, status: 'error' })
          setTimeout(() => {
            setNotification(undefined)
          }, 5000)
        })
    }
  }

  const newBlogForm = () => (
    <Togglable buttonLabel="create post" ref={newBlogFormRef}>
      <NewBlogForm handleNewPost={addNewPost} ref={newBlogFormRefFields}/>
    </Togglable>
  )

  const blogsList = () => (
    <div>
      <p>
        {user?.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
      {newBlogForm()}
      {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} handleRemove={removeBlog}/>
      ))}
    </div>
  )

  return (
    <div>
      <h2>{user ? 'blogs' : 'log in to the application'}</h2>
      <Notification message={notification?.message} status={notification?.status}/>
      {!user ? loginForm() : blogsList()}
    </div>
  )
}

export default App
