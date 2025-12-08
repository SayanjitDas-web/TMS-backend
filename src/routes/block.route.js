import { Router } from "express";
import { auth } from "../middlewares/auth.js"
import { createBlock, deleteBlock, getBlock, updateTitle, updateCode, updateExplanation} from "../controllers/block.controller.js"

const blockRouter = Router()

blockRouter.get("/:blockId", auth, getBlock)
blockRouter.post("/create/:docId", auth, createBlock)
blockRouter.post("/delete", auth, deleteBlock)
blockRouter.post("/update/title", auth, updateTitle)
blockRouter.post("/update/code", auth, updateTitle)
blockRouter.post("/update/exp", auth, updateTitle)

export default blockRouter