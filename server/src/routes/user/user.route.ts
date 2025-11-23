import { Router } from "express";
import { register, getMe, login } from "../../controllers/user/user.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.post("/api/auth/register", register);

router.post("/api/auth/login", login);

router.get("/api/auth/Me", checkAuth ,getMe);

export default router;

