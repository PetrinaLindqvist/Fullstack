const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      let stateClone = { ...state}
      stateClone = action.content
      return stateClone
    default:
      return state
  }
}

export const filterChange = (content) => {
  return {
    type: 'SET_FILTERS',
    content,
  }
}

export default filterReducer 