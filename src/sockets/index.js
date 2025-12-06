import documentSocket from "./document.socket.js"

export default function registerSocketHandlers(io) {

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    documentSocket(io, socket)

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });
}