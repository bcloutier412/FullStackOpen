/*
  @UNICAFE 
*/
// import { useState } from "react";

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);
//   const [total, setTotal] = useState(0);

//   const handleClick = (rating, setRating) => () => {
//     setRating(rating + 1);
//     setTotal(total + 1);
//   };

//   return (
//     <div>
//       <h1>give feedback</h1>
//       <Button handleClick={handleClick(good, setGood)} text={"good"} />
//       <Button handleClick={handleClick(neutral, setNeutral)} text={"neutral"} />
//       <Button handleClick={handleClick(bad, setBad)} text={"bad"} />
//       <h1>Statistics</h1>
//       <Statistics good={good} neutral={neutral} bad={bad} total={total} />
//     </div>
//   );
// };

// const Button = (props) => {
//   return <button onClick={props.handleClick}>{props.text}</button>;
// };

// const Statistics = ({ good, neutral, bad, total }) => {
//   const calculateAverage = () => {
//     return (good - bad) / total;
//   };

//   const calculatePositive = () => {
//     return ((good / total) * 100).toString() + "%";
//   };

//   if (total === 0) return <div>No feedback given</div>;

//   return (
//     <table>
//       <tbody>
//         <StatisticLine text={"good"} value={good} />
//         <StatisticLine text={"neutral"} value={neutral} />
//         <StatisticLine text={"bad"} value={bad} />
//         <StatisticLine text={"all"} value={total} />
//         <StatisticLine text={"average"} value={calculateAverage()} />
//         <StatisticLine text={"positive"} value={calculatePositive()} />
//       </tbody>
//     </table>
//   );
// };

// const StatisticLine = ({ text, value }) => {
//   return (
//     <tr>
//       <td>{text}</td>
//       <td>{value}</td>
//     </tr>
//   );
// };
// export default App;


import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0)
  const increaseVotes = (selected) => {
    const newVotes = [ ...votes ];
    newVotes[selected] += 1;
    setVotes(newVotes)
  }

  //Selects a random index for an Anecdote from the array and rerenders the component
  const selectRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  return (
    <div>
      {anecdotes[selected]}
      <Votes votes={votes[selected]}/>
      <Button handleClick={() => increaseVotes(selected)} text={'vote'} />
      <Button handleClick={selectRandom} text={'next anecdote'} />
    </div>
  )
}
const Votes = ({ votes }) => <div>has {votes} votes</div>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

export default App