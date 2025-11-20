import React, { useMemo } from "react";
import { TodoContext } from "./TodoContext";
import axios from "axios";
import { mapServerTodo } from "../../utils/mapServer";

interface TodoProvidorProps {
  children: React.ReactNode;
}

export const TodoProvidor: React.FC<TodoProvidorProps> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [idForEdit, setIdForEdit] = React.useState<Todo["id"] | null>(null);

  const selectedId = (id: Todo["id"]) => {
    setIdForEdit(id);
  };

  const getTodos = async () => {
    try {
      const response = await axios.get<ServerTodo[]>(
        "http://localhost:5000/todos/get"
      );
      setTodos(response.data.map(mapServerTodo));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async ({
    name, // полтзовательсикй ввод
    description,
  }: Omit<Todo, "id" | "checked">) => {
    try {
      const response = await axios.post<ServerTodo>(
        "http://localhost:5000/todos/add",
        {
          name: name,
          description: description,
        }
      );
      setTodos((prev) => [...prev, mapServerTodo(response.data)]); // чтобы в других файлах выташить todo.id а не todo._id
    } catch (error) {
      console.log(error);
    }
  };

  console.log(idForEdit);

  const checkTodo = async (id: Todo["id"]) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/todos/check/${id}`
      );

      const updatedTodo = response.data;

      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            return mapServerTodo(updatedTodo);
          }
          return todo;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/todos/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const changeTodo = async ({
    name,
    description,
  }: Omit<Todo, "id" | "checked">) => {
    if (!idForEdit) return;
    try {
      const response = await axios.patch(
        `http://localhost:5000/todos/update/${idForEdit}`,
        {
          name: name,
          description: description,
        }
      );
      setTodos((prev) => {
        return prev.map((todo) => {
          if (todo.id === idForEdit) {
            return mapServerTodo(response.data);
          } else {
            return todo;
          }
        });
      });
      setIdForEdit(null);
    } catch (error) {
      console.log(error);
    }
  };

  const value = React.useMemo(
    () => ({
      selectedId,
      todos,
      changeTodo,
      idForEdit,
      deleteTodo,
      addTodo,
      checkTodo,
    }),
    [selectedId, todos, changeTodo, idForEdit, deleteTodo, addTodo, checkTodo]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
