import { useQuery } from "react-query";
import "./styles/App.scss";
import { createTodo, getTodos, removeTodo, editTodo } from "./lib/api/api";
import { useState, useEffect } from "react";

interface todoItem {
  id: string;
  title: string;
  done: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface editItem {
  todoId: string;
  isDone: boolean;
  title: string;
}

function App() {
  const { data } = useQuery("allTodos", getTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [todos, setTodos] = useState<todoItem[]>(data || []);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

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

  //수정 함수
  const handleEdit =
    ({ todoId, isDone, title }: editItem) =>
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        await editTodo({ id: todoId, isDone, title: editedTitle || title });
      } catch (error) {
        console.error("ToDo 수정 중 오류 발생:", error);
      }
    };

  //수정모드로 전환
  const enterEditMode = (title: string) => {
    setEditMode(true);
    setEditedTitle(title);
  };

  const handleCancel = () => {
    setEditMode(false);
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
            {editMode ? (
              <>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button
                  onClick={() =>
                    handleEdit({
                      todoId: item.id,
                      isDone: item.done,
                      title: item.title,
                    })
                  }
                >
                  수정완료
                </button>
                <button onClick={handleCancel}>취소</button>
              </>
            ) : (
              <>
                <p>{item.title}</p>
                <button onClick={() => handleRemove(item.id)}>삭제</button>
                <button onClick={() => enterEditMode(item.title)}>수정</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
