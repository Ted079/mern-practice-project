/// <reference types="vite/client" />

// type Todo = {
//   id: number;
//   name: string;
//   description: string;
//   checked: boolean;
// };


interface Todo {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

interface ServerTodo {
  _id: string;
  name: string;
  description: string;
  checked: boolean;
}