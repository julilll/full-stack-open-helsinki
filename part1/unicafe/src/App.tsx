import React from "react";

import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Title = ({ text }) => <h1>{text}</h1>;

const StatisticsLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  const rates = stats?.map((el) => el.score * el.count);
  const ratesCount = stats?.map((el) => el.count);
  const total = ratesCount?.reduce((el, total) => el + total);
  const average = rates.reduce((el, total) => el + total) / total;
  const positivePercentage = (rates[0] / total) * 100;

  return (
    <table>
      <tbody>
        {stats.map((stat, index) => (
          <StatisticsLine key={index} name={stat.rate} value={stat.count} />
        ))}
        <StatisticsLine name="all" value={total} />
        <StatisticsLine name="average" value={average.toFixed(1)} />
        <StatisticsLine name="positive" value={positivePercentage.toFixed(1) + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const stats = [
    {
      rate: "good",
      count: good,
      score: 1,
    },
    {
      rate: "neutral",
      count: neutral,
      score: 0,
    },
    {
      rate: "bad",
      count: bad,
      score: -1,
    },
  ];

  return (
    <>
      <Title text="give feedback" />
      <div>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <Title text="statistics" />
      {stats.find((el) => el.count > 0) ? (
        <Statistics stats={stats} />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

export default App;
