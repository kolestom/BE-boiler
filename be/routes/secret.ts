import  {Request, Response, Router} from "express";
import { onlyUser } from "../middlewares/onlyUser";

const router = Router()

router.get('/', onlyUser, (req: Request, res: Response) => {
    res.json({msg: 'Secret Message'})
})

export default router