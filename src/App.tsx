import { useQuery } from "react-query";
import "./styles/App.scss";
import { getTodos } from "./lib/api/api";

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
  console.log(data);
  return (
    <>
      {data?.map((item: todoItem) => (
        <li key={item.id} className="list__item">
          <p>{item.title}</p>
          <button>삭제</button>
          <button>수정</button>
        </li>
      ))}
    </>
  );
}

export default App;
