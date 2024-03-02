import React from "react";

import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Title = ({ text }) => <h1>{text}</h1>;

const Paragraph = ({ text }) => <p>{text}</p>;

const TotalVotes = ({ count }) => <p>has {count} votes.</p>;

const Winner = ({ anecdote, count }) => (
  <div>
    <Title text="Anecdote with most votes" />
    <Paragraph text={anecdote} />
    <TotalVotes count={count} />
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const points: number[] = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(points);

  const randomize = () => {
    const randomAnectode = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnectode);
  };

  const vote = () => {
    const copy = [...voted];
    copy[selected] += 1;
    setVoted(copy);
  };

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Paragraph text={anecdotes[selected]} />
      <TotalVotes count={voted[selected]} />
      <Button text="vote" handleClick={vote} />
      <Button text="next anecdote" handleClick={randomize} />
      {voted.filter((el) => el > 0)?.length > 0 && (
        <Winner
          anecdote={
            anecdotes[voted.findIndex((el) => el === Math.max(...voted))]
          }
          count={Math.max(...voted)}
        />
      )}
    </div>
  );
};

export default App;
