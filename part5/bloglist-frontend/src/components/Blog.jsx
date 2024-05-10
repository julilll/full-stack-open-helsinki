import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [likesBtnDisabled, setlikesBtnDisabled] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = () => {
    setlikesBtnDisabled(true)
    const updatedLikes = likes + 1
    const updatedPost = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: updatedLikes,
    }
    blogService
      .update(blog.id, updatedPost)
      .then(() => {
        setLikes(updatedLikes)
        setlikesBtnDisabled(false)
      })
      .catch((err) => console.log(err))
  }

  const byCurrentUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    let user
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
    }
    return user?.name === blog?.user?.name
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div>
          <a href={blog.url} className='blog-url'>{blog.url}</a>
          <p  className='blog-likes'>
            likes {likes}{' '}
            <button onClick={addLike} disabled={likesBtnDisabled}>
              like
            </button>
          </p>
          <p>{blog?.user?.name}</p>
          {byCurrentUser() && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
