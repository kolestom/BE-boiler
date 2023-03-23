import express, { Express, Request, Response } from "express";
import { z } from "zod";
import { getIdToken } from "../api/google";
import jwt from "jsonwebtoken";
import { safeParse } from "../utility/safeParse";

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY || "demo_key";
if (!secretKey) throw "Secret Key is required";

/// ZOD SCHEMA ///

const LoginRequest = z.object({
  code: z.string(),
});

type LoginRequest = z.infer<typeof LoginRequest>;

const Payload = z.object({
  sub: z.string(),
  email: z.string().email(),
});

type Payload = z.infer<typeof Payload>;

///

// const ojjektum = {
//   code: 12345
// }

// const ojjektum2 = {
//   sub: "235648",
//   email: "aaa@gmail.com"
// }

// const teszt = () => {
//   const result = ZodSafeParse(Payload, ojjektum2, 500)
// console.log(result)

// }

// teszt()

router.post("/", async (req: Request, res: Response) => {
  const loginRequest = safeParse(LoginRequest, req.body);

  if (!loginRequest) {
    return res.sendStatus(400);
  }

  const idToken = await getIdToken(loginRequest.code);
  if (!idToken) return res.status(401);
  const payload: unknown = jwt.decode(idToken);
  const result = safeParse(Payload, payload);
  if (!result) {
    return res.sendStatus(500);
  }
  const sessionToken = jwt.sign(result, secretKey);
  res.json(sessionToken);
});
export default router;
