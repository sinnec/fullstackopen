import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}
  
const Total = ({ course }) => {
  const partsArray = course.parts.map(part => part.exercises)
  const sum = partsArray.reduce((total, exercises) => total + exercises)
  return(
    <div><strong>total of {sum} exercises</strong></div>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

export default Course