import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import signup from "./routes/login"



dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/signup', signup)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
