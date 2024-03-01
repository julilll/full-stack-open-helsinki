const Part = (props) => <p>{props.name} {props.hours}</p>

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => <div>{props.exercises.map((exercise, index) => <Part key={index} name={exercise.name} hours={exercise.hours} />)}</div>

const Total = (props) => <p>Number of exercises {props.parts.map(el => el.hours).reduce((total, value) => total += value)}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of React',
      hours: 10
    }, {
      name: 'Using props to pass data',
      hours: 7
    }, {
      name: 'State of a component',
      hours: 14
    }]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content exercises={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App