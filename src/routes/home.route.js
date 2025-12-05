import { Router } from "express";

const homeRouter = Router()

homeRouter.get("/", async(req , res )=> {
    res.send("<h1>hello from the TMS</h1>")
})

homeRouter.post("/test",async(req, res) => {
    const {data} = req.body
    res.status(200).json({success: true, data })
})

export default homeRouter