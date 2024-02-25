const Part = (props) => <p>{props.name} {props.hours}</p>

const Header = (props) => <h1>{props.course}</h1>;

const Content = (props) => <div>{props.exercises.map((exercise, index) => <Part key={index} name={exercise.name} hours={exercise.hours}/>)}</div>

const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = 'Half Stack application development'
  const exercises = [{
    name: 'Fundamentals of React',
    hours: 10
  }, {
    name: 'Using props to pass data',
    hours: 7
  }, {
    name: 'State of a component',
    hours: 14
  }]

  return (
    <div>
      <Header course={course}/>
      <Content exercises={exercises}/>
      <Total total={exercises.map(el => el.hours).reduce((total, value) => total += value)}/>
    </div>
  )
}

export default App