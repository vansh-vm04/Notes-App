import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
const mongoUrl: string = process.env.MONGO_URL as string;

export const dbConnect = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};