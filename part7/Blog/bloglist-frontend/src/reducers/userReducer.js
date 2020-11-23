const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLACE_USER':
      return action.data
    case 'UNDO_USER':
      return initialState
    default:
      return state
  }
}

export const userPlace = (user) => {
  return {
    type: 'PLACE_USER',
    data: user
  }
}

export const userUndo = () => {
  return {
    type: 'UNDO_USER'
  }
}

/*export const initializeUsers = (users) => {
  return {
    typ: 'INIT_USERS',
    data: users,
  }
}*/

export default userReducer