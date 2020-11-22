import blogService from '../services/blogs'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'ADD': {
      return [...state, action.data]
    }
    default: 
      return state
  }
}

export const addBlogs = (content) => {
  return dispatch => {
    dispatch({
      type: 'ADD',
      data: content,
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

export default reducer