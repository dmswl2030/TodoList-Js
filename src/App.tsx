import { useQuery } from "react-query";
import "./styles/App.scss";
import { createTodo, getTodos } from "./lib/api/api";
import { useState } from "react";

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
  console.log(data);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newTodo = await createTodo(newTodoTitle);
      console.log("새로운 ToDo가 생성되었습니다:", newTodo);
      setNewTodoTitle("");
    } catch (error) {
      console.error("ToDo 생성 중 오류 발생:", error);
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
        {data?.map((item: todoItem) => (
          <li key={item.id} className="list__item">
            <p>{item.title}</p>
            <button>삭제</button>
            <button>수정</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
