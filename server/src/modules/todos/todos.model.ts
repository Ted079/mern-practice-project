import mongoose, { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TodoModel = model("Todo", todoSchema);
export default TodoModel;
