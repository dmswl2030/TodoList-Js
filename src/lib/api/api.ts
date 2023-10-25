import { formatDate } from "../util/formatDate";
import axios from "axios";

const api = axios.create({
  baseURL: "https://asia-northeast3-heropy-api.cloudfunctions.net/api",
  headers: {
    apikey: "KDT5_nREmPe9B",
    username: "KDT5_LeeEunJi",
  },
});

// todo 생성하기
export async function createTodo(todo: string) {
  try {
    const response = await api.post("/todos", {
      title: todo,
    });

    const data = response.data;
    const formattedCreatedAt = formatDate(data.createdAt);
    const formattedUpdatedAt = formatDate(data.updatedAt);

    const id = data.id;

    const newTodo = {
      id,
      order: data.order,
      title: data.title,
      done: data.done,
      createdAt: formattedCreatedAt,
      updatedAt: formattedUpdatedAt,
    };

    return newTodo;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// todo List 가져오기
export async function getTodos() {
  try {
    const response = await api.get("/todos");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// todo 삭제하기
export async function removeTodo(id: string) {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// todo 편집하기
interface TodoItem {
  id: string;
  isDone: boolean;
  title: string;
}

export async function editTodo({ id, isDone, title }: TodoItem) {
  try {
    await api.put(`/todos/${id}`, {
      title: title ? title : editTitle,
      done: isDone,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
