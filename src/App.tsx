import { useQuery } from "react-query";
import "./styles/App.scss";
import { createTodo, getTodos, removeTodo } from "./lib/api/api";
import { useState, useEffect } from "react";

interface todoItem {
  id: string;
  title: string;
  done: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const { data } = useQuery("allTodos", getTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [todos, setTodos] = useState<todoItem[]>(data || []);
  console.log("todos", todos);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  //추가 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newTodo = await createTodo(newTodoTitle);
      setTodos([newTodo, ...todos]);
      setNewTodoTitle("");
    } catch (error) {
      console.error("ToDo 생성 중 오류 발생:", error);
    }
  };

  //삭제 함수
  const handleRemove = (todoId: string) => async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await removeTodo(todoId);
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("ToDo 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your todo!"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todos?.map((item: todoItem) => (
          <li key={item.id} className="list__item">
            <p>{item.title}</p>
            <button onClick={handleRemove(item.id)}>삭제</button>
            <button>수정</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
