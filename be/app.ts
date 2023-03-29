

import express, { Express, Request, Response } from "express";
import signup from "./routes/login"
import cors from 'cors'

// import { env } from "./utility/envParser";
import appointments from './routes/appDemo'

const app: Express = express();


app.use(cors())
app.use(express.json());
app.use('/api/signup', signup)
app.use('/api/appointment', appointments)

// const mongourl = env.MONGO_URL


export default app



