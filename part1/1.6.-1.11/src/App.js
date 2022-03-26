import { useState } from 'react'

const StatisticLine = (props) => {
  console.log(props)
  return (
  <table>
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  </table>
  )
}


const Statistics = (props) => {
  console.log(props)
  if (props.good + props.neutral + props.bad == 0) {
    return (
    <div>No feedback given</div>
    )
  }

  return(
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="average" value ={(props.good - props.bad)/(props.good + props.neutral + props.bad)} />
      <StatisticLine text="positive" value ={(props.good/(props.good + props.bad + props.neutral)) * 100 + '%'} />
    </div>
  )
}


const Button = (props) => {
  return(
    <button onClick={() => props.handleClick(props.value + 1)}>
         {props.text}
    </button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={setGood} value={good} text='good'/>
      <Button handleClick={setNeutral} value={neutral} text='neutral'/>
      <Button handleClick={setBad} value={bad} text='bad'/>
      <h1>
        statistics
      </h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App