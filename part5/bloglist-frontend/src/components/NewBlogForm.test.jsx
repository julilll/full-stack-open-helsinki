import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const handleNewPost = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm handleNewPost={handleNewPost} />)

  const input = screen.getByPlaceholderText('write blog title here')
  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(handleNewPost.mock.calls).toHaveLength(1)
  expect(handleNewPost.mock.calls[0][0].title).toBe('testing a form...')
})