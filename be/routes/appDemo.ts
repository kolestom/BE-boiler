import express, { Request, Response } from "express";
import { AppMent, AppMentType } from "../model/appoints";
import { z } from "zod";
import { verify } from "../middlewares/verify";

const router = express.Router()

const PostRequestSchema = z.object({
    startDate: z.string(),
    startTime: z.string(),
    endDate: z.string(),
    endTime: z.string(),
    comment: z.string().optional(),
})
type PostRequestType = z.infer<typeof PostRequestSchema>

router.post('/', verify(PostRequestSchema), async (req: Request, res: Response) =>{
    const data: PostRequestType = req.body
    // business logic checks: starDate earlier than endDate,...

    const newAppointment = await AppMent.create<AppMentType>(data)
    res.json(newAppointment._id)
})

export default router