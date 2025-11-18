import React from "react";

interface TodoContextProps {
  todos: Todo[];
  checkTodo: (id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  selectedId: (id: Todo["id"]) => void;
  idForEdit: Todo["id"] | null;
  addTodo: ({ name, description }: Omit<Todo, "id" | "checked">) => void;
  changeTodo: (todos: Omit<Todo, "id" | "checked">) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    todos: [],
    idForEdit: null,
    addTodo: () => {},
    deleteTodo: () => {},
    changeTodo: () => {},
    checkTodo: () => {},
    selectedId: () => {},
});
