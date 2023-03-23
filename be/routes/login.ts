import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Verify } from "../middlewares/verify";

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY || "demo_key";
if (!secretKey) throw "Secret Key is required";


router.post("/", Verify, async (req: Request, res: Response) => {
  
  const sessionToken = jwt.sign(res.locals.result, secretKey);
  res.send(sessionToken);
});
export default router;
