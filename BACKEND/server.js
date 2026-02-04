import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.js";
import userRoute from "./routes/userRoute.js";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
  origin: ' http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
// API routes
app.use("/api", chatRoutes);
app.use("/api", userRoute);


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongoDB");
  } catch (err) {
    console.log("FAILED TO CONNECT", err);
  }

}
