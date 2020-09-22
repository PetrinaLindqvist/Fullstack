import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
 )
}
const Statistics = (props) => {
  return (
    <div>{props.text} {props.value}</div>
  )
}
const App = () => {
  // save clicks of each button to own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
 
  const increaseByOneLeft = () => {setGood(good + 1)}
  const increaseByOneMiddle = () => {setNeutral(neutral + 1)}
  const increaseByOneRight = () => {setBad(bad + 1)}
 
  const all = <all value={good + neutral + bad} />
  const average = <average value={(good * 1 + neutral * 0 +  bad * -1)/ all} />
  const positive = <positive value={good / all * 100 + '%'} />


  return (
    <div>
      <h1>give feedback</h1>
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
     <h1>statistics</h1>
     <Statistics text='good' value={good} />
     <Statistics text='neutral' value={neutral} />
     <Statistics text='bad' value={bad} />
     <Statistics text='all' value={good + neutral + bad} />
     <Statistics text='average' value={(good * 1 + neutral * 0 +  bad * -1) / all} />
     <Statistics text='positive' value={(good / all * 100) + ' %'} />
    </div>
   )
  
  } 
ReactDOM.render(<App />, 
  document.getElementById('root')
)


