import { config } from "dotenv";
config();

import http from "http";
import { Server } from "socket.io";
import express from "express";
import connectDb from "./config/db.js";
import registerSocketHandlers from "./sockets/index.js";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({origin:"*", credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

import homeRoute from "./routes/home.route.js";
app.use("/api/index", homeRoute)

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  },
});

registerSocketHandlers(io);
connectDb();

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`server is running on port:${port}`);
  }else{
    console.log(`server is running on http://localhost:${port}`);
  }
});
