const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      let stateClone = { ...state }
      stateClone = action.notification
      return stateClone
  case 'HIDE_NOTIFICATIONS':
      return initialState
  default:
      return state
  }
}

export const showNotif = notification => {
  return {
    type: 'SET_NOTIFICATIONS',
    notification
  }
}

export const hideNotif = (notification) => {
  return {
    type: 'HIDE_NOTIFICATIONS',
    notification
  }
}



export default notificationReducer