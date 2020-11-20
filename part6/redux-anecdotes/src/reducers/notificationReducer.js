const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return action.data
      case 'HIDE_NOTIFICATIONS':
        return initialState
      default:
        return state
  }
}

export const showNotif = notification => {
  return {
    type: 'SET_NOTIFICATIONS',
    data : notification
  }
}

export const hideNotif = () => {
  return {
    type: 'HIDE_NOTIFICATIONS'
  
  }
}

export default notificationReducer