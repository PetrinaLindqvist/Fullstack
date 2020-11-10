import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notifications from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
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
  const blogFormRef = useRef()

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
    blogFormRef.current.toggleVisibility()
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
    //console.log('logging in with', username, password)
  

  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
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
      
      <Notifications message={message} errorMessage={errorMessage} /> 
        <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={ handleLogin }
      />
    </div> 
      )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notifications message={message} errorMessage={errorMessage} />
      <p>{user.name} logged in
      <button onClick={() => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
      }}>logout</button></p>
       <div>

       <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          onSubmit={addNewBlog}
          titleValue={newBlogTitle}
          authorValue={newBlogAuthor}
          urlValue={newBlogUrl}
          handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
          handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
          handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
          />
      </Toggleable>

      
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App