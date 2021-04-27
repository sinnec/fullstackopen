import React, { useState } from 'react'

const Anecdote = ({anecdotes, points, selected}) => (
  <div>{anecdotes[selected]}<br></br>
  has {points[selected]} votes</div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))
  const [maxPoints, setMaxPoints] = useState(0)

  const handleSelected = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const handlePoints = () => {
    const newPoints = [...points]
    newPoints[selected]++
    setPoints(newPoints)
    let maxIndex = newPoints.indexOf(Math.max(...newPoints))
    setMaxPoints(maxIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} points={points} selected={selected} />
      <Button handleClick={handlePoints} text='vote' />
      <Button handleClick={handleSelected} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} points={points} selected={maxPoints} />
    </div>
  )
}

export default App