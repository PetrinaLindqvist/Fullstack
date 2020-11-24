import React, { useState } from 'react'


const CommentsForm = (props) => {
  const [comment, setComments] = useState('')
  return (
    <form>
      <input 
        type='text'
        id='comment'
        value={comment}
        onChange={({ target }) => setComments(target.value)}
      />
      <button onClick={e => { e.preventDefault(); props.writeComments(comment) }}>add comment</button>

    </form>
  )
}

export default CommentsForm 