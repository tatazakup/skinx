import { Router, Request, Response } from "express";
import { type SigninProps, Signin } from "../controllers/authentication";

const AuthenticationRouter = Router();

AuthenticationRouter.post(
  "/",
  async (req: Request<never, never, SigninProps, never>, res: Response) => {
    const body = req.body;

    if (!body.username || !body.password) return res.sendStatus(204);

    const [c, r] = await Signin(body);

    if ([1, 2].includes(c)) return res.sendStatus(401);

    res.cookie("refreshToken", r?.refresh);
    res.cookie("accessToken", r?.access);

    return res.sendStatus(200);
  }
);

export default AuthenticationRouter;
