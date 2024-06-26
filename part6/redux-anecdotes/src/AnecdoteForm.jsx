import { useDispatch } from "react-redux";
import { newAnecdote } from "./reducers/anecdoteReducer";
import { removeNotification, setNotification } from "./reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(newAnecdote(content));
    dispatch(setNotification(`you added new anecdote: '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
