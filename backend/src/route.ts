import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { UserModel, OtpModel, NoteModel } from "./model";
import { generateExpiry, generateOtp } from "./utils/otp";
import { sendOtpMail } from "./utils/mailService";
import { authMiddleware } from "./middleware";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;

router.post('/request-otp',async(req:Request,res:Response)=>{
    const {type,name,email} = req.body;
    try {
        const user = await UserModel.findOne({email});

        if(type=="signin"){
            if(!user) return res.status(404).json({message:"User not found"});
        }

        if(type=="signup"){
            if(user) return res.status(409).json({message:"User already exist"});
            await UserModel.findOneAndUpdate({
                name,
                email
            })
        }
        const otp = generateOtp();
        const expiresAt = generateExpiry();
        await OtpModel.findOneAndUpdate({email},{
            email,
            otp,
            expiresAt
        },{upsert:true, new:true})
        const emailSent = await sendOtpMail(email,otp);
        // console.log(otp)
        if(!emailSent) return res.status(500).json({message:"Error sending otp"});
        res.status(200).json({message:"Otp sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.post('/verify-otp',async (req:Request,res:Response)=>{
    const {otp, email} = req.body;
    try {
        const savedOtp = await OtpModel.findOne({email});
        if(!savedOtp){
            return res.status(410).json({message:"Otp expired"})
        }
        if(otp != savedOtp.otp){
            return res.status(401).json({message:"Wrong otp"})
        }
        const user = await UserModel.findOne({email});
        if(!user) return res.status(404).json({message:"User not found"});

        const token = jwt.sign({id:user._id},JWT_SECRET)

        res.status(200).json({token:token});
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.post('/note',authMiddleware ,async (req:Request,res:Response)=>{
    const {note} = req.body;
    try {
        const userId = req.userId;
        const newNote = await NoteModel.create({
            note,
            userId
        })
        res.status(200).json({note:newNote});
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.patch('/note',authMiddleware ,async (req:Request,res:Response)=>{
    const {note,noteId} = req.body;
    try {
        const userId = req.userId;
        const newNote = await NoteModel.findOneAndUpdate({userId,_id:noteId},{note:note},{new:true});
        res.status(200).json({note:newNote});
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

router.delete('/note',authMiddleware, async (req:Request,res:Response)=>{
    const {noteId} = req.body;
    try {
        const userId = req.userId;
        await NoteModel.findOneAndDelete({userId,_id:noteId});
        res.status(200).json({message:"Note deleted", noteId});
    } catch (error) {
        res.status(500).json({message:"Unable to delete note"})
    }
})

router.get('/note',authMiddleware ,async (req:Request,res:Response)=>{
    const userId = req.userId;
    try {
        const notes = await NoteModel.find({userId});
        res.status(200).json({notes});
    } catch (error) {
        res.status(500).json({message:"Notes not found"});
    }
})

router.get('/verify-user',authMiddleware,async (req:Request,res:Response)=>{
    const userId = req.userId;
    try {
        const user = await UserModel.findById(userId);
        res.status(200).json({message:"Success",user:{name:user?.name,email:user?.email}});
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

export default router;