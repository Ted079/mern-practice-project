import React, { useMemo } from "react";
import { TodoContext } from "./TodoContext";
import axios from "axios";
import { DEFAULT_TODO_LIST } from "../../utils/todoData";

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
        "http://localhost:5000/get"
      );
      console.log(response.data);
      const formatted: Todo[] = response.data.map((t) => ({
        id: t._id,
        name: t.name,
        description: t.description,
        checked: t.checked,
      }));
      setTodos(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async ({
    name,
    description,
  }: Omit<Todo, "id" | "checked">) => {
    try {
      const response = await axios.post("http://localhost:5000/add", {
        name: name,
        description: description,
      });
      setTodos((prev) => [
        ...prev,
        {
          id: response.data._id,
          name,
          description,
          checked: response.data.checked,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };



  
//////////////////////////////////////////////////////////////
  const checkTodo = (id: Todo["id"]) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const changeTodo = (todos: Omit<Todo, "id" | "checked">) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === idForEdit) {
          return { ...todo, name: todos.name, description: todos.description };
        } else {
          return todo;
        }
      });
    });
    setIdForEdit(null);
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
