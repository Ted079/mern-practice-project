import React, { useState } from "react";
import styles from "./App.module.css";
import { DEFAULT_TODO_LIST } from "./../utils/todoData";
import Header from "./../components/Header/Header";
import TodoPanel from "./../components/TodoPanel/TodoPanel";
import TodoList from "./../components/TodoList/TodoList";

function App() {
  const [todos, setTodos] = React.useState<Todo[]>(DEFAULT_TODO_LIST);

  const addTodo = ({ name, description }: Omit<Todo, "id" | "checked">) => {
    // setTodos([
    //   ...todos,
    //   { id: todos[todos.length - 1].id + 1, name, description, checked: false },
    // ]);

    setTodos((prev) => {
      const newId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      const updatedTodo: Todo = {
        id: newId,
        name,
        description,
        checked: false,
      };
      return [...prev, updatedTodo];
    });
  };

  const checkTodo = (id: number) => {
    setTodos((prev) =>
      prev.map(
        (todo) => {
          if (todo.id === id) {
            return { ...todo, checked: !todo.checked };
          }
          return todo;
        }
        // todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); 
    // можно и без prev, просто обращаемся сразу к todos. 
    // prev создает копию массива todos. 

  };

  // const editTodo = (id: number, name: string, description: string, checked: boolean) => {
  //   setTodos(prev => 
  //   const existingItem = prev.filter((todo) => todo.id === id);
  //   const updatedTodo : Todo = {};
  //   );
  // };

  return (
    <div className={styles.app_container}>
      <div className={styles.container}>
        {/* <Header todoCount={todos.length} /> */}
        {/* <TodoPanel addTodo={addTodo} /> */}
        {/* <TodoList todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo} /> */}
      </div>
    </div>
  );
}

export default App;
