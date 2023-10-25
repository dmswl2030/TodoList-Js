import { formatDate } from "../util/formatDate";

//todo 생성하기
export async function createTodo(todo) {
  try {
    const res = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
        body: JSON.stringify({
          title: todo,
        }),
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const json = await res.json();

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
    throw error; // Re-throw the error to handle it in the component
  }
}

//todo List 가져오기
export async function getTodos() {
  try {
    const res = await fetch(
      "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
      {
        headers: {
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//todo 삭제하기
export async function removeTodo(id) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//todo 편집하기
export async function editTodo(id, isDone, title) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          apikey: "KDT5_nREmPe9B",
          username: "KDT5_LeeEunJi",
        },
        body: JSON.stringify({
          title: title ? title : editTitle,
          done: isDone,
        }),
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
