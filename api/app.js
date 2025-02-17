import express from 'express';
import { fileURLToPath } from 'url';
import cors from "cors";
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';
import path from 'path';
import dotenv from 'dotenv';


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist', 'index.html'));
});


app.listen(process.env.PORT || 8800);