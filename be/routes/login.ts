import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verify } from "../middlewares/verify";
import { safeParse } from "../utility/safeParse";
import { z } from "zod";
import { getIdToken } from "../api/google";
import {User, type UserType} from "../model/user"

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY
// const secretKey = process.env.JWT_SECRET_KEY || "demo_key";
if (!secretKey) throw "Secret Key is required";

const LoginRequestSchema = z.object({
  code: z.string(),
});
type LoginRequest = z.infer<typeof LoginRequestSchema>;
  
const Payload = z.object({
  sub: z.string(),
  email: z.string().email(),
});
type Payload = z.infer<typeof Payload>;



router.post("/", verify(LoginRequestSchema), async (req: Request, res: Response) => {

  const loginRequest = req.body as LoginRequest
  const idToken = await getIdToken(loginRequest.code);
  if (!idToken) return res.status(401);
  const payload: unknown = jwt.decode(idToken);
  const result = safeParse(Payload, payload);
  
  if (!result) {
    return res.sendStatus(500);
  }
  
  const data: UserType = result
  const user = new User(data);
  await user.save()
  
  const sessionToken = jwt.sign(result, secretKey);
  res.send(sessionToken);
});
export default router;

