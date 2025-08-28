import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv";
import { dbConnect } from "./db";

const app = express();
const port = 3000;
const frontend_origin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontend_origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH']
  })
);

configDotenv();

dbConnect();

app.use(express.json());

app.get('/api/health', async(req,res)=>{
    res.status(200).json({message:"Server is alive"})
})

app.listen(port,()=>{
    console.log("Server is connected")
})