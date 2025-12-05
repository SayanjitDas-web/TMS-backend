
export default function registerSocketHandlers(io) {

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log("Socket Disconnected:", socket.id);
    });
  });
}