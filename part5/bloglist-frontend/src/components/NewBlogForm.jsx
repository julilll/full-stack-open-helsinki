import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'
import { useImperativeHandle } from 'react'

const NewBlogForm = forwardRef(({ handleNewPost }, refs) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newPostAdd = (event) => {
    event.preventDefault()
    const newPost = { title, author, url }
    handleNewPost(newPost)
  }

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(refs, () => {
    return { clearForm }
  })

  return (
    <form onSubmit={newPostAdd}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          placeholder='write blog title here'
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
  )
})

NewBlogForm.propTypes = {
  handleNewPost: PropTypes.func.isRequired
}

NewBlogForm.displayName = 'NewBlogForm'

export default NewBlogForm
