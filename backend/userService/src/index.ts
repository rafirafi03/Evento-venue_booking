import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./infrastructure/db";
import userRoute from "./infrastructure/express/route";

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
