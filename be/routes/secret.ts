import  {Request, Response, Router} from "express";
import { User, onlyUser } from "../middlewares/onlyUser";

const router = Router()

router.get('/', onlyUser, (req: Request, res: Response) => {
    const user = res.locals.user as User
    console.log(user)
    res.json({msg: 'Secret Message'})
})

export default router