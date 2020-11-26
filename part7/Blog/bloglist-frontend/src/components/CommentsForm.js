import React, { useState } from 'react'
import { Button,  Form } from 'react-bootstrap'


const CommentsForm = (props) => {
  const [comment, setComments] = useState('')
  return (
    <Form>
      <Form.Group>
      <Form.Control
        type='text'
        id='comment'
        value={comment}
        onChange={({ target }) => setComments(target.value)}
      />
      <Button variant='info' onClick={e => { e.preventDefault(); props.writeComments(comment) }}>add comment</Button>
      </Form.Group>
    </Form>
  )
}

export default CommentsForm 