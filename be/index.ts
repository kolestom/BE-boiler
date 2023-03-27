import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import signup from "./routes/login"
import cors from 'cors'
import mongoose from "mongoose";
import { env } from "./utility/envParser";
import appointments from './routes/appDemo'

const app: Express = express();


app.use(cors())
app.use(express.json());
app.use('/api/signup', signup)
app.use('/api/appointment', appointments)

const mongourl = env.MONGO_URL
//zoddal validalni env 

mongoose.connect(env.MONGO_URL)

app.listen(env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT} for EXPRESS_TS_BOILERPLATE`);
});
