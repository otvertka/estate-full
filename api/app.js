import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import testRoute from './routes/test.route.js';

import dotenv from 'dotenv';
dotenv.config(); // Загрузит переменные из .env файла


const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);


app.listen(8800, () => {
    console.log('Server is running!');
})





// UPPERCASE :)
// const str = "create a new user and save to db";
// const str1 = str.toUpperCase();
// console.log(str1)