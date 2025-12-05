import mongoose from "mongoose";
import { config } from "dotenv";

config()

export default async function connectDb () {
   try{
      const conn = await mongoose.connect(`${process.env.MONGO_URI}`)
      console.log("mongodb connected at port: " , conn.connection.port)
   }catch(err){
      console.log("mongodb failed to make connection ! , error: ", err)
   }
}