import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../utility/envParser";
import { z } from "zod";

const env2 = z.object({JWT_SECRET_KEY: z.string()}).parse(process.env)  // igy is lehet parse-olni az env-et

export const onlyUser = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization
    if (!authHeader) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    try {
        const verifiedUser = jwt.verify(token, env2.JWT_SECRET_KEY)
        // zod-dal verify-olni (safeparse) kell, h olyan-e a payload, amit elvar a server
        res.locals.user = verifiedUser
        next()
    } catch (err) {
        console.log(err);
        return res.sendStatus(401)
    }
}