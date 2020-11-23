import blogService from '../services/blogs'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE': {
      const id = action.data.id
      const changeBlog = state.find(blogs => blogs.id === id)
      const likeBlog = { ...changeBlog, likes: changeBlog.likes + 1 }
      return state.map(blog =>
        blog.id !== id ? blog : likeBlog
      )
    }
    case 'INIT':
      return action.data
    case 'ADD': {
      return [...state, action.data]
    }
    case 'REMOVE': {
        const id = action.data
        return state.filter(blogs => blogs.id !== id)
      
    }
    default: 
      return state
  }
}

export const addBlogs = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'ADD',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}

export const likeBlogs = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const removeBlogs = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id,
    })
  }
}

export default reducer