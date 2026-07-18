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
const allowedOrigins = [
  "http://localhost:5173",
  "https://byte-gpt-eight.vercel.app",
  "https://byte-gpt-gw7p.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
// API routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api", chatRoutes);
app.use("/api", userRoute);


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connected");
} catch (err) {
    console.log("❌ FAILED TO CONNECT", err);
}


}
