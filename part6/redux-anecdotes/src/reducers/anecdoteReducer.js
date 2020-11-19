import anecdoteService from '../services/anecdotes'
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_VOTES': {
      const id = action.data.id
      const voteToChange = state.find(vot => vot.id === id)
      const changedVote = { 
        ...voteToChange, 
        votes: voteToChange.votes +1
      }
      return state.map(vote =>
        vote.id !== id ? vote : changedVote )
      }

    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTES': {
        return [...state, action.data]
      }
      default:
        return state
    }
  }

  export const handVote = (id) => {
    return {
      type: 'NEW_VOTES',
      data: { id }
    }
  }

  export const initializeAnecdotes = (anecdotes) => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
    	dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
  export const createAnecdote = (content) => {
    return async dispatch => {
      const addNewAnecdotes = await anecdoteService.createNew(content)
      dispatch({
      type: 'NEW_ANECDOTES',
      data: addNewAnecdotes  
      })
    }
  }

export default reducer