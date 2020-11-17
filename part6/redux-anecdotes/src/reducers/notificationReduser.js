const notificationReducer = (state = 'message', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return action.notifications
    default:
      return state
  }
}



export default notificationReducer