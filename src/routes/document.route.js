import { Router } from "express";
import { createDocument, deleteDocument, updateSessionId, getDocument } from "../controllers/document.controller.js"
import { auth } from "../middlewares/auth.js"

const documentRouter = Router()

documentRouter.get("/:docId", auth, getDocument)
documentRouter.post("/create", auth, createDocument)
documentRouter.post("/delete", auth, deleteDocument)
documentRouter.post("/updateSession", auth, updateSessionId)

export default documentRouter