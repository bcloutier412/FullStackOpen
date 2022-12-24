import React from "react"

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

const Header = (props) => {
  return (
  <React.Fragment>
    <h1>{props.course}</h1>
  </React.Fragment>)
}

const Content = (props) => {
  return (
    <React.Fragment>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </React.Fragment>
  )
}

const Part = (props) => {
  return (
    <React.Fragment>
      <p>{props.part.name} {props.part.exercises}</p>
    </React.Fragment>
  )
}

const Total = (props) => {
  return (
    <React.Fragment>
      <p>Number of exercises {props.total}</p>
    </React.Fragment>
  )
}
export default App
