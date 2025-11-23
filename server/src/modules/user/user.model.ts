import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, min: 2, max: 10 },
    email: { type: String, required: true, min: 2, max: 10 },
    password: { type: String, required: true, min: 5 },
    // todo: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Todo",
    //   },
    // ],
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);
export default UserModel;
