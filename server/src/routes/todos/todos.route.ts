import express from "express";
import {
  addTodo,
  checkTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../controllers/todos/todos.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = express.Router();

router.get("/get",checkAuth, getTodos);

router.post("/add", checkAuth, addTodo);

router.patch("/check/:id", checkAuth, checkTodo);

router.patch("/update/:id", checkAuth, updateTodo);

router.delete("/delete/:id", checkAuth, deleteTodo);

export default router;
