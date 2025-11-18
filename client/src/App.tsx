import React, { useState } from "react";
import styles from "./App.module.css";
import { DEFAULT_TODO_LIST } from "./utils/todoData";
import Header from "./components/Header/Header";
import TodoPanel from "./components/TodoPanel/TodoPanel";
import TodoList from "./components/TodoList/TodoList";
import { TodoProvidor } from "./store";

function App() {
  return (
    <TodoProvidor>
      <div className={styles.app_container}>
        <div className={styles.container}>
          <Header />
          <TodoPanel mode="add" />
          <TodoList />
        </div>
      </div>
    </TodoProvidor>
  );
}

export default App;
