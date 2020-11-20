import React from 'react'
import { connect } from 'react-redux'
import { handVote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  
  
  const vote = (id, anecdote) => {
    props.handVote(id, anecdote)
    props.showNotif(`You have voted on this: "${anecdote.content}"`, 5)
    
        
  }

const sortAnecdotes = (anecdotes) => {
    return (anecdotes.sort((a, b) => b.votes - a.votes)
  
    )
}
const filterAnecdotes = (filter, anecdotes) => {
  const filteredAnecdotes = anecdotes.filter(ane => ane.content.toUpperCase().includes(filter.toUpperCase()))
  return filteredAnecdotes
}
return (
  <div>
      {sortAnecdotes
      (filterAnecdotes(props.filter, props.anecdotes)).map(anecdote =>
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}
const mapDispatchToProps = {
  handVote, showNotif
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)


  export default ConnectedAnecdotes

