import React from "react"

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Header = (props) => {
  return (
  <React.Fragment>
    <h1>{props.course.name}</h1>
  </React.Fragment>)
}

const Content = (props) => {
  return (
    <React.Fragment>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
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
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </React.Fragment>
  )
}
export default App
