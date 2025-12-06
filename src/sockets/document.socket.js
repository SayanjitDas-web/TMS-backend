import Document from "../models/Document.model.js";

export default function documentSocket(io, socket) {
  socket.on("connectDocument", async (sessionId, callback) => {
    const document = await Document.findOne({ sessionId });
    if (!document) {
      callback({ success: false, message: "session expired" });
    }

    if (document.sessionId !== sessionId) {
      callback({ success: false, message: "session expired" });
    }
    socket.join(sessionId);
  });

  socket.on("sendDocument", async ({ sessionId, docId }) => {
    const document = await Document.findById(docId);
    if (!document) {
      io.to(sessionId).emit(
        "document",
        "document with the given id not found!"
      );
    }
    io.to(sessionId).emit("document", document);
  });
}
