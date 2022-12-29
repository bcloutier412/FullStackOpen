import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClick = (rating, setRating) => () => {
    setRating(rating + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick(good, setGood)} text={"good"} />
      <Button handleClick={handleClick(neutral, setNeutral)} text={"neutral"} />
      <Button handleClick={handleClick(bad, setBad)} text={"bad"} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = ({ good, neutral, bad, total }) => {
  const calculateAverage = () => {
    return (good - bad) / total;
  };

  const calculatePositive = () => {
    return ((good / total) * 100).toString() + "%";
  };

  if (total === 0) return <div>No feedback given</div>;

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={total} />
        <StatisticLine text={"average"} value={calculateAverage()} />
        <StatisticLine text={"positive"} value={calculatePositive()} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
export default App;
