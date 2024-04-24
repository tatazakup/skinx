import { Router } from "express";
import AuthenticationRouter from "./authentication";
import PostRouter from "./post";

const router = Router();

router.use("/auth", AuthenticationRouter);
router.use("/post", PostRouter);

export default router;
