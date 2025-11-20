import type { Request, Response } from "express";
import TodoModel from "../../modules/todos/todos.model";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find();
    if (!todos) {
      return res.status(404).json({ error: "todo is not found" });
    }
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "data is not found" });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const name = req.body.name;
  const description = req.body.description;
  try {
    const todo = await TodoModel.create({
      name: name,
      description: description,
      checked: false,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "smth went wrong" });
  }
};

export const checkTodo = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const todo = await TodoModel.findByIdAndUpdate(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo is not found" });
    }

    todo.checked = !todo.checked;

    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "smth went wrong" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateName = req.body.name;
  const updateDescription = req.body.description;

  try {
    const todo = await TodoModel.findByIdAndUpdate(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo is Not Found" });
    }
    todo.name = updateName;
    todo.description = updateDescription;

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "smth went wrong" });
  }
};


export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await TodoModel.findByIdAndDelete(id);
    res.json({ message: `deleted element by id=${id}` });
  } catch (error) {
    res.status(500).json({ error: "smth went wrong" });
  }
};
