import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv";
import { dbConnect } from "./db";
import router from "./route";
import mongoose from "mongoose";

configDotenv();
const app = express();
const frontend_origin = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: frontend_origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH']
  })
);

dbConnect();

app.use(express.json());

app.use('/api',router);

app.get('/api/ready', async(req,res)=>{
    try {
      const dbState = mongoose.connection.readyState;
      if(dbState == 1){
        res.sendStatus(200);
      }else{
        res.sendStatus(500);
      }
    } catch (error) {
      res.sendStatus(500);
    }
})

app.listen(PORT,()=>{
    console.log("Server is connected")
})