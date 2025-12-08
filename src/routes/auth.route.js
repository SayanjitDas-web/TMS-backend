import { Router } from "express";
import { auth } from "../middlewares/auth.js"
import { adminLogin, logout, checkAuth } from "../controllers/admin.controller.js"

const authRouter = Router()

authRouter.post("/login", adminLogin)

authRouter.post("/logout", auth, logout)
authRouter.get("/check", auth , checkAuth)

export default authRouter