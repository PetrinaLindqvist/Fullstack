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
    return {
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    }
  }
  export const createAnecdote = (content) => {
    return {
      type: 'NEW_ANECDOTES',
      data:  content 
    }
  }

export default reducer