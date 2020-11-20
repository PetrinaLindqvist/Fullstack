const initialState = ''
let timeoutID = 0

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

export const showNotif = (notification, second) => {
  return async dispatch => {
    dispatch({
    type: 'SET_NOTIFICATIONS',
    data : notification
  }
    )
    clearTimeout(timeoutID)
    hideNotif()
    timeoutID =  setTimeout(() => {
      dispatch(hideNotif()) 
  }, second * 1000)
  
  }
}

export default notificationReducer