import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/anecdoteForm'
import { handVote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(handVote(id))
      
  }

  const sortAnecdotes = (anecdotes) => {
      return anecdotes.sort((a, b) => b.votes - a.votes)
    
    }
  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm />
      </div>
  )
}

export default App