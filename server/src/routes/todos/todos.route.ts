import express from "express";
import TodoModel from "../../modules/todos/todos.model";
import { error } from "console";
import {
  addTodo,
  checkTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../controllers/todos/todos.controller";

const router = express.Router();

router.get("/get", getTodos);

router.post("/add", addTodo);

router.patch("/check/:id", checkTodo);

router.patch("/update/:id", updateTodo);

router.delete("/delete/:id", deleteTodo);

export default router;
