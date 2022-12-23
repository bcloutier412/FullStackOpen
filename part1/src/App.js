const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}
const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}
const App = () => {
  const name = 'Pekka'
  const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}
// OR IT CAN BE THIS IF YOU WANT TO ADD JS BEFORE RETURNING THE JSX CONTENT OF THE COMPONENT
// const App = () => {
//   console.log('Hello from komponentti')
//   return (
//     <div>
//       <p>Hello world</p>
//     </div>
//   )
// }
/*
  Note: Either of these functions work, all these two functions are doing
  is returning jsx to be rendered by react.
*/
export default App
