import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlogs, likeBlogs, removeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { userPlace, userUndo } from './reducers/userReducer'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom" 
import CommentsForm from './components/CommentsForm'
import { Table, Form, Button, Alert } from 'react-bootstrap'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [comment, setComments] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const [message] = useState(null)


  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    usersService
      .getAll()
      .then(users => dispatch(initializeUsers(users)))
  }, [dispatch])


  useEffect(() => {
    const user = storage.loadUser()
    dispatch(userPlace(user))
  }, [dispatch])

  const notifyWith = (message, type='success') => {
    const messages = {message, type}
    dispatch(setNotification(messages, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(userPlace(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
      
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlogs(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const writeComments = async (comment) => {
    const id = matchingBlog.id
    try {
      const newComment = {comment}
      await blogService.comment(newComment, id)
      notifyWith(`you commented blog id ${id} with comment ${comment}`)
      dispatch(initializeBlogs(blogs.map(b => b.id === id
        ? {...matchingBlog, comments: matchingBlog.comments.concat(comment)}
        : b
        )))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogLike = blogs.find(b => b.id === id)
    const likedBlogs = { ...blogLike, likes: blogLike.likes + 1, user: blogLike.user.id }
    dispatch(likeBlogs(likedBlogs))
  }

  const handleRemove = async (id) => {
    const blogsToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogsToRemove.title} by ${blogsToRemove.author}`)
    if (ok) {
      dispatch(removeBlogs(blogsToRemove.id))
    
    notifyWith(`Deleted blog "${blogsToRemove.title}" by ${blogsToRemove.author}`, 'error')
  }
}
  

  const handleLogout = () => {
    dispatch(userUndo())
    storage.logoutUser()
  }

  const matching = useRouteMatch('/users/:id')
  const matchingUser = matching
    ? users.find(user => user.id === (matching.params.id))
    : null

  const blogsMatching = useRouteMatch('/blogs/:id')
  const matchingBlog = blogsMatching
    ? blogs.find(user => user.id === (blogsMatching.params.id))
    : null
   
  if ( !user ) {
    return (
      <div className="container" >
        {(message &&
        <Alert variant="success">
          {message}
        </Alert>
        )}
        <h2>Login to application</h2>

        <Notification />
        
        <Form onSubmit={handleLogin}>
        <Form.Group> 
          <div>
          <Form.Label>username:</Form.Label>
             <Form.Control
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          <Form.Label>password:</Form.Label>
          <Form.Control
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button variant="info" type="submit">login</Button>
          </Form.Group>
        </Form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
 
  const User = () => {
   if(!matchingUser) {
     return null
   }
   if (user !== null) {
     const name = matchingUser.name
     return (
       <>
        <h2>{name}</h2>
        <b>added blogs</b>
        <ul>
          {matchingUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
        </>
     )
   }
      return
 }

 const BlogPage =() => {
  if(!matchingBlog) {
    return null
  }

  return (
    <>
      <h2>{matchingBlog.title} {matchingBlog.author}</h2>
      <a href={matchingBlog.url}>{matchingBlog.url}</a>
      <div>{matchingBlog.likes} likes <Button variant='info' onClick={() => handleLike(matchingBlog.id)}>like</Button></div>
      <div>added by {matchingBlog.author}</div>
      <h3>comments:</h3>
      <CommentsForm 
      writeComments = {writeComments}
      id = {matchingBlog.id} 
    />

    <ul>
      {matchingBlog.comments.map((commentz, index) =>
    <li key={index}>{commentz}</li>
    )}
  </ul>
  </>
)
}
const padding = { 
  padding: 5, 
  marginTop: 10,
  marginRight: 15
}

const paddingbutton = {
  padding: 5,
  marginTop: 10
}

  return (
    <div>
     <Router>
     <div> 
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in <Button variant='secondary'style={paddingbutton} onClick={handleLogout}>logout</Button>
      </div>
      <h2>Blog app</h2>
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User user={matchingUser}/>
          </Route>
          <Route path="/users">
          <Table className="table table-bordered">
            <thead>
            <tr><th><h3>Users</h3></th><th>blogs created</th></tr>
            </thead>
            <tbody>
            {users.map(user => 
           <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td> 
           </tr>)}
           </tbody>
          </Table>
          </Route>
        <Route path="/blogs/:id">
          <BlogPage/>
        </Route>
        <Route path="/">
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
       </Route>
      </Switch>
    </Router>

  </div>
  )
}

export default App