import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  // save clicks of each button to own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOneLeft = () => setGood(good + 1)
  const increaseByOneMiddle = () => setNeutral(neutral + 1)
  const increaseByOneRight = () => setBad(bad + 1)

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
  return (
    <div>
      
    <Button
      handleClick={increaseByOneLeft}
      text='good'
    />
    <Button
      handleClick={increaseByOneMiddle} 
      text='neutral'
    />     
    <Button
      handleClick={increaseByOneRight}
      text='bad'
    />           
    </div>

   )
  }

ReactDOM.render(<App />, 
  document.getElementById('root')
)


