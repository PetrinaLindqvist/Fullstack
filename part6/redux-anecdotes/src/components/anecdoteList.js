import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(handVote(id))
        
  }

const sortAnecdotes = (anecdotes) => {
    return (anecdotes.sort((a, b) => b.votes - a.votes)
  
)
}
return (
  <div>
      {sortAnecdotes
      (anecdotes).map(anecdote =>
      <div key={anecdote.id}>
       <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
    )}
  </div>  
  
  )
}

  export default AnecdoteList