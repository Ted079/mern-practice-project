import React, { type FC } from "react";
import styles from "./Header.module.css";
import { useTodo } from "../../store";

const Header: React.FC = () => {
  const { todos } = useTodo();
  console.log(todos);
  
  return (
    <div className={styles.header_container}>
      <div className={styles.header_title}>
        Todo list <b>{todos.length}</b> task(s)
      </div>
    </div>
  );
};

export default Header;
