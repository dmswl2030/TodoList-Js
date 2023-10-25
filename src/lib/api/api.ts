import { formatDate } from "../util/formatDate";
import axios from "axios";

// todo 생성하기
export async function createTodo(todo: string) {
  try {
    const response = await axios.post(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
      {
        title: todo,
      },
      {
        headers: {
          "content-type": "application/json",
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
      }
    );

    const json = response.data;
    const formattedCreatedAt = formatDate(json.createdAt);
    const formattedUpdatedAt = formatDate(json.updatedAt);

    const id = json.id;

    const newTodo = {
      id,
      order: json.order,
      title: json.title,
      done: json.done,
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
    const response = await axios.get(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
      {
        headers: {
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// todo 삭제하기
export async function removeTodo(id: string) {
  try {
    await axios.delete(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        headers: {
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
      }
    );
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
    await axios.put(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        title: title ? title : editTitle,
        done: isDone,
      },
      {
        headers: {
          "content-type": "application/json",
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
