import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handVote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  

  
  const vote = (id, anecdote) => {
    dispatch(handVote(id, anecdote))
    dispatch(showNotif(`You have voted on this: "${anecdote.content}"`, 5))
    
        
  }

const sortAnecdotes = (anecdotes) => {
    return (anecdotes.sort((a, b) => b.votes - a.votes)
  
    )
}
const filterAnecdotes = () => {
  let copyAnecdotes = [...anecdotes]
  let copyFilter = filter
  let filteredAnecdotes = copyAnecdotes.filter(ane => ane.content.toUpperCase().includes(copyFilter.toUpperCase()))
  return filteredAnecdotes
}
return (
  <div>
      {sortAnecdotes
      (filterAnecdotes()).map(anecdote =>
      <div key={anecdote.id}>
       <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
      </div>
    </div>
    )}
  </div>  
  
  )
}

  export default AnecdoteList

