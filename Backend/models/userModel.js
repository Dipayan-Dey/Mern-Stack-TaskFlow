import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      // trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // lowercase: true,
      // trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  },
  {
    timestamps: true // auto-creates createdAt and updatedAt fields
  }
);

const UserDb = mongoose.model("ToDoUser", userSchema);

export { UserDb };
