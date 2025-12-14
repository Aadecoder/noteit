import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MonogoDB Connected Successfully");
    } catch (error) {
        console.error("Error Connecting to MonogoDB", error);
        process.exit(1); // exit with failure
    }
};