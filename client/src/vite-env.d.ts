/// <reference types="vite/client" />

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
