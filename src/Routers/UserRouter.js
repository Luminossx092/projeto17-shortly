import { Router } from "express";
import { GetRanking, GetUserInfo } from "../Controllers/UsersController";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

const router = Router();

router.get('/users/me',AuthMiddleware,GetUserInfo);
router.get('/ranking',GetRanking);

export default router;