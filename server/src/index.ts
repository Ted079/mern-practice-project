import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Schema, model } from "mongoose";
import todoRouter from "./routes/todos/todos.route"

//dotenv — это библиотека, которая загружает переменные из файла .env в process.env.
//Зачем он нужен?
//Хранить секретные данные

const app = express();
dotenv.config();

//Constants
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

//Middleware - это некая функция которая расширяет(дополняет) базовые настройки экпресса
app.use(cors()); //cors это для того чтобы наш бэкен разрешал запросы с разных ip адресов
app.use(express.json()); //это для того express чтобы понимал что из front-end все данными будет в формате json

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDb is connected"))
  .catch((error) => console.log(error));


// app.use("/api/todos", todoRouter );
app.use("/", todoRouter );  


// const todoSchema = new Schema({
//   title: { type: String, required: true },
//   completed: { type: Boolean, default: false },
// });

// const TodoModel = model("Todo", todoSchema);

// app.get("/get", async (req, res) => {
//   try {
//     const todos = await TodoModel.find();
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: "smt went wrong" });
//   }
// });

// app.post("/add", async (req, res) => {
//   const title = req.body.title;
//   try {
//     const todo = await TodoModel.create({
//       title: title,
//       completed: false,
//     });
//     res.status(201).json(todo);
//   } catch (error) {
//     res.status(500).json({ error: "smth went wrong" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server started on PORT = ${PORT}`); //endpoint
});
