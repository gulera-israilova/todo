import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import todoRoute from './routes/todoRoute.js';
import cors from 'cors';
import fileUploadRoute from "./routes/fileUploadRoute.js";
import swaggerUI from "swagger-ui-express";
import {specs} from "./utils/swaggerOptions.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/auth',authRoute);
app.use('/todo',todoRoute);
app.use('/file',fileUploadRoute);
app.use('/uploads', express.static('uploads'));

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

export default PORT