import express, { Express, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verify } from "../middlewares/verify";
import { safeParse } from "../utility/safeParse";
import { z } from "zod";
import { getIdToken } from "../api/google";
import {User, type UserType} from "../model/user"
import { env } from "../utility/envParser";

const router = express.Router();

// const secretKey = process.env.JWT_SECRET_KEY
// const secretKey = process.env.JWT_SECRET_KEY || "demo_key";
if (!env.JWT_SECRET_KEY) throw "Secret Key is required";

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
  if (!idToken) return res.sendStatus(401);
  const payload: unknown = jwt.decode(idToken);
  const result = safeParse(Payload, payload);
  
  if (!result) {
    return res.sendStatus(500);
  }
  
  const [user] = await User.find<UserType>({sub: result.sub})

  if (!user) {
    const newUser = await User.create<UserType>(result)
    const parseResult = safeParse(Payload, newUser)
    if (!parseResult) return res.sendStatus(500);
    const sessionToken = jwt.sign(parseResult, env.JWT_SECRET_KEY);
    return res.send({token: sessionToken});
    
  }
  
  // const data: UserType = result
  // const newUser = new User(data);
  // await newUser.save()
  
  const sessionToken = jwt.sign(result, env.JWT_SECRET_KEY);
  res.send({token: sessionToken});
});
export default router;

