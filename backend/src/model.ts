import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true}
})

const NoteSchema = new mongoose.Schema({
    note:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
})

const OtpSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    otp:{type:String,required:true},
    expiresAt: { type: Date, required: true },
})

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const UserModel = mongoose.model('User',UserSchema)
export const NoteModel = mongoose.model('Note',NoteSchema)
export const OtpModel = mongoose.model('Otp',OtpSchema)