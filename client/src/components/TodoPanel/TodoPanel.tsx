import React, {
  useState,
  type ChangeEvent,
  type HtmlHTMLAttributes,
} from "react";
import styles from "./TodoPanel.module.css";
import { Button } from "../Button/Button";
import { useTodo } from "../../store";

const DEFAULT_TODO = {
  name: "",
  description: "",
};

interface AddTodosPanelProps {
  mode: "add";
}

interface EditTodosPanelProps {
  mode: "edit";
  editTodoValues: Omit<Todo, "id" | "checked">;
}

type TodosPanelProps = AddTodosPanelProps | EditTodosPanelProps;

const TodoPanel: React.FC<TodosPanelProps> = (props) => {
  const { changeTodo, addTodo } = useTodo();
  const isEdit = props.mode === "edit";
  const [todos, setTodos] = React.useState(
    isEdit ? props.editTodoValues : DEFAULT_TODO
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodos({ ...todos, [name]: value });
  };

  const onClick = () => {
    const itemTodo = { name: todos.name, description: todos.description };

    if (isEdit) {
      changeTodo(itemTodo);
    } else {
      addTodo(itemTodo);
      setTodos(DEFAULT_TODO);
    }
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor="name">
            Name
            <input
              type="name"
              name="name"
              value={todos.name}
              onChange={handleChange}
              placeholder=""
            />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor="name">
            Description
            <input
              type="text"
              name="description"
              value={todos.description}
              onChange={handleChange}
              placeholder=""
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <Button onClick={onClick} color="blue">
            ADD
          </Button>
        )}
        {isEdit && (
          <Button onClick={onClick} color="orange">
            EDIT
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoPanel;
