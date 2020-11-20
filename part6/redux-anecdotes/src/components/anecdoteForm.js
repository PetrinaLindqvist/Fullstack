import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotif(`"${content}" is added`, 5)
    
  }  
    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  </div>
)
}
const mapDispatchToProps = {
  createAnecdote, showNotif
}

export default connect(null,mapDispatchToProps)(AnecdoteForm) 
 
