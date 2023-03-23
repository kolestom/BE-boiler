import jwt from "jsonwebtoken";
import { safeParse } from "../utility/safeParse";
import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { getIdToken } from "../api/google";

const LoginRequest = z.object({
    code: z.string(),
  });
  
  type LoginRequest = z.infer<typeof LoginRequest>;
  
  const Payload = z.object({
    sub: z.string(),
    // email: z.string().email(),
  });
  
  type Payload = z.infer<typeof Payload>;


export const Verify = async (req: Request, res: Response, next: NextFunction) => {
  const loginRequest = safeParse(LoginRequest, req.body);
  console.log("loginRequest",loginRequest);

  if (!loginRequest) return res.sendStatus(403);

  const idToken = await getIdToken(loginRequest.code);
  if (!idToken) return res.status(401);
  const payload: unknown = jwt.decode(idToken);
  const result = safeParse(Payload, payload);
  
  if (!result) {
    return res.sendStatus(500);
  }
  res.locals.result = result
  next()
  
};
