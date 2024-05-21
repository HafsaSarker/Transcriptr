import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes";
import { connectDB } from "./db/connect";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use("/api", router());

const boot = async () => {
  try {
    await connectDB();
    server.listen(8080, () => {
      console.log("Server running on http://localhost:8080/");
    });
  } catch (error) {
    console.log(error);
  }
};

boot();
