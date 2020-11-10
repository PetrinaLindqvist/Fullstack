import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      
    }
  }, [])

  const addNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setMessage(`A new blog "${newBlogTitle}" by ${newBlogAuthor} is added`)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
  }

const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  

  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
      )
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    setMessage('Successfully logged in')
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  } catch (exception) {
    setErrorMessage('Wrong username or password')
    setUsername('')
    setPassword('')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

if (user === null) {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notifications message={message} errorMessage={errorMessage} />
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
    </div> 
      )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notifications message={message} errorMessage={errorMessage} />
      <p>{user.name} logged in
      <button onClick={() => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
      }}>logout</button></p>
       <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title:
            <input
            type="text"
            value={newBlogTitle}
            name="title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={newBlogAuthor}
            name="author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={newBlogUrl}
            name="url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
        </form>

      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App