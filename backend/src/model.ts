import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String}
})

const NoteSchema = new mongoose.Schema({
    note:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
})

export const UserModel = mongoose.model('User',UserSchema)
export const NoteModel = mongoose.model('Note',NoteSchema)