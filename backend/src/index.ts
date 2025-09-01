import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv";
import { dbConnect } from "./db";
import router from "./route";

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

app.get('/api/health', async(req,res)=>{
    res.status(200).json({message:"Server is alive"})
})

app.listen(PORT,()=>{
    console.log("Server is connected")
})