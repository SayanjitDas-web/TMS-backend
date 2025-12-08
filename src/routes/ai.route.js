import { Router } from "express";
import { auth } from "../middlewares/auth.js"
import { genCodeExp} from "../controllers/ai.controller.js"

const aiRouter = Router()

aiRouter.post("/generate/exp", auth, genCodeExp)

export default aiRouter