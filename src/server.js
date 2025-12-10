import { config } from "dotenv";
config();

import http from "http";
import { Server } from "socket.io";
import express from "express";
import connectDb from "./config/db.js";
import registerSocketHandlers from "./sockets/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import homeRoute from "./routes/home.route.js";
app.use("/api/index", homeRoute);

import authRouter from "./routes/auth.route.js";
app.use("/api/auth", authRouter);

import documentRouter from "./routes/document.route.js";
app.use("/api/document", documentRouter);

import blockRouter from "./routes/block.route.js";
app.use("/api/block", blockRouter);

import aiRouter from "./routes/ai.route.js";
app.use("/api/ai", aiRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
  },
});

registerSocketHandlers(io);
connectDb();

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`server is running on port:${port}`);
  } else {
    console.log(`server is running on http://localhost:${port}`);
  }
});
