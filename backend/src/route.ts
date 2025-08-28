import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { UserModel, OtpModel } from "./model";
import { generateExpiry, generateOtp } from "./utils/otp";
import { sendOtpMail } from "./utils/mailService";

const JWT_SECRET = process.env.JWT_SECRET as string;

router.post('/request-otp',async(req,res)=>{
    const {type,name,email} = req.body;
    try {
        if(type=="signin"){
            const user = await UserModel.findOne({email});
            if(!user) return res.status(404).json({message:"User not found"});
        }
        if(type=="signup"){
            await UserModel.create({
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
        console.log(otp)
        if(!emailSent) return res.status(500).json({message:"Error sending otp"})
        res.status(200).json({message:"Otp sent"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.post('/verify-otp',async (req,res)=>{
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

export default router;