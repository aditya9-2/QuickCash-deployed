import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import accountRouter from "./routers/accountRouter.js";
import connectDB from "./config/db.js";
import path from "path"
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors({
//     origin: ["http://localhost:3000", "https://quickcash-deployed.onrender.com"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],

// }));

app.use(cors())

const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);


app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(port, async () => {
    await connectDB();
    console.log(`server listens on port: ${port}`);

});