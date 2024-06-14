import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";
import Filter from './Filter'
import Notification from "./Notification";
import { removeNotification, setNotification } from "./reducers/notificationReducer";

const App = () => {
  const anecdotes = useSelector((state) => {
    const sortedList = [...state.anecdotes]?.sort((a, b) => b?.votes - a?.votes);
    return state.filter.length > 0 ? sortedList.filter(el => el.content.includes(state.filter)): sortedList;
  }
  );
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification/>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
