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



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)


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
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(addBlogs(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
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
      <div>
        <h2>login to application</h2>

        <Notification />
        
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
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
      <div>{matchingBlog.likes} likes <button onClick={() => handleLike(matchingBlog.id)}>like</button></div>
      <div>added by {matchingBlog.author}</div>
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
        {user.name} logged in <button style={paddingbutton} onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User user={matchingUser}/>
          </Route>
          <Route path="/users">
          <h3>Users</h3>
          <table>
            <thead>
            <tr><th></th><th>blogs created</th></tr>
            </thead>
            <tbody>
            {users.map(user => 
           <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td> 
           </tr>)}
           </tbody>
          </table>
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