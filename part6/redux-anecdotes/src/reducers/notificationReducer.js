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

export const showNotif = (notification, second) => {
  return async dispatch => {
    dispatch({
    type: 'SET_NOTIFICATIONS',
    data : notification
  }
    )
    setTimeout(() => {
      dispatch({ 
    type: 'HIDE_NOTIFICATIONS'
  })
}, second * 1000)
  
  }
}

export default notificationReducer