import React from "react";

const Total = ({ count }) => (
  <p style={{ fontWeight: 700 }}>total of {count} exercises</p>
);

const Part = ({ text, count }) => (
  <p>
    {text} {count}
  </p>
);

const Content = ({ parts }) =>
  parts.map((el) => <Part key={el.id} text={el.name} count={el.exercises} />);

const Header = ({ title }) => <h2>{title}</h2>;

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header title={name} />
      <Content parts={parts} />
      <Total
        count={parts
          .map((el) => el.exercises)
          .reduce((el, total) => (el += total))}
      />
    </>
  );
};

export default Course;