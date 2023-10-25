import { useQuery } from "react-query";
import "./styles/App.scss";
import { createTodo, getTodos, removeTodo, editTodo } from "./lib/api/api";

function App() {
  const { data, error, isLoading } = useQuery("allTodos", getTodos);
  return (
    <>
      <div>{data}</div>
    </>
  );
}

export default App;
