import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001


app.use(express.json()); // This middleware will parse the JSON Bodies: req.body
app.use(cors({
    origin: "http://localhost:5173",
}));
// another simple custom middleware
app.use((req, res, next)=>{
    console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
    next();
});


app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("server started at port 5001: ", PORT);
    });
});