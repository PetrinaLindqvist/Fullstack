import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders the blogs title and author, but does not render its url or number ', () => {
  const user = {
    username: "Wiskas",
    password: "cat",
  }

  const blog = {
    title: 'Done by me',
    author: "By me",
    url: "www.byme.com",
    likes: 32,
    user: user

  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  // method 3
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)

  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
    

})