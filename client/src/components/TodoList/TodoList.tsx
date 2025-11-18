import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import TodoPanel from "../TodoPanel/TodoPanel";
import { useTodo } from "../../store";

const TodoList: React.FC = ({}) => {
  const { todos, idForEdit, checkTodo, selectedId, deleteTodo } = useTodo();
  return (
    <div>
      {todos.map((todo) => {
        if (todo.id === idForEdit) {
          return (
            <TodoPanel
              mode="edit"
              editTodoValues={{
                name: todo.name,
                description: todo.description,
              }}
              key={todo.id}
            />
          );
        }

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
            selectedId={selectedId}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
