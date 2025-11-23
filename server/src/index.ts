import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Schema, model } from "mongoose";
import todoRouter from "./routes/todos/todos.route";
import userRouter from "./routes/user/user.route";

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

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen((PORT) => {
      `Server started on PORT = ${PORT}`;
    });
  } catch (error) {
    console.log(error);
  }
}

app.use("/todos", todoRouter );
app.use("/user", userRouter );

app.listen(PORT, () => {
  console.log(`Server started on PORT = ${PORT}`); //endpoint
});
