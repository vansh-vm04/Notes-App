import jwt from "jsonwebtoken"
import { NextFunction,Request,Response } from "express"

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    try {
        if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message:"Token not found"});
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,JWT_SECRET);
        if(typeof decoded == 'string'){
            return res.status(401).json({
                message:"Invalid token"
            })
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}