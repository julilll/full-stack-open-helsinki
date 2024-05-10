import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

describe ('<Blog/>', () => {
  let container
  const blog = {
    id: 0,
    title: 'The title',
    url: 'www.yahoo.com',
    author: 'User',
    likes: 12
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} />
    ).container
  })

  test('at start title and author are displayed, but url and likes are not displayed', () => {
    const title = screen.getByText(`${blog.title} ${blog.author}`)

    expect(title).toBeInTheDocument()
    expect(container.querySelector('.blog-url')).not.toBeInTheDocument()
    expect(container.querySelector('.blog-likes')).not.toBeInTheDocument()
  })

  test('After clicking on butthon url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(container.querySelector('.blog-url')).toBeInTheDocument()
    expect(container.querySelector('.blog-likes')).toBeInTheDocument()
  })

  test('After clicking on butthon url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likesButton = screen.getByText('like')
    await user.click(likesButton)

    expect(likesButton).toBeDisabled()
  })
})