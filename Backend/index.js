import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoute.js";
import { todoRoute } from "./routes/todorouter.js";

dotenv.config(); // Load env variables

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));
app.get("/",(req,res)=>{
  res.send("✅ Server is running");
})
app.use("/api/user",userRouter)
app.use("/api/todo",todoRoute)

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit the app if DB fails
  }
};
// console.log(process.env.MONGO_URL);
// Start server after DB connects
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
