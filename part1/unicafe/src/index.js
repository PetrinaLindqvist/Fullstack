import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
 )
}

const App = () => {
  // save clicks of each button to own state
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad 
  const average = (good * 1 + neutral * 0 +  bad * -1)/ all 
  const positive = good / all * 100 + '%'
 
 
  const increaseByOneLeft = () => {setGood(good + 1)}
  const increaseByOneMiddle= () => {setNeutral(neutral + 1)}
  const increaseByOneRight = () => {setBad(bad + 1)}
 
 

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseByOneLeft} text='good'/>
      <Button handleClick={increaseByOneMiddle} text='neutral' />
      <Button handleClick={increaseByOneRight} text='bad'/>
      <h1>statistics</h1>    
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
      
    </div>

   )
  }


   
  const Statistics = (props) => {
    if (props.all === 0) {
   return (
    <div>
      <p>No feedback given</p>
    </div>
   )
    }
    
 return (
    <table>
      <thead>
      <tr>
        <td>good {props.good} </td>
      </tr>
      <tr>
        <td>neutral {props.neutral}</td>
      </tr>
      <tr>
        <td>bad {props.bad}</td>
      </tr>
      <tr>
        <td>all {props.all}</td>
      </tr>
      <tr>
        <td>average {props.average}</td>
      </tr>
      <tr>
        <td>positive {props.positive}</td>
      </tr>
      </thead>
    </table>
  )
 }
  ReactDOM.render(<App />, 
  document.getElementById('root')
)


