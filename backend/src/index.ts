import express from "express"
import cors from "cors"

const app = express();

const port = 3000;

app.use(express.json());

app.get('/api/health', async(req,res)=>{
    res.status(200).json({message:"Server is alive"})
})

app.listen(port,()=>{
    console.log("Server is connected")
})