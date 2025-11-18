import express from "express";
import TodoModel from "../../modules/todos/todos.model";

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "data is not found" });
  }
});


router.post("/add", async (req, res) => {
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
});

router.post("/:id/patch", async (req, res) => {});

router.post("/:id/delete", async (req, res) => {});

export default router;
