import { Router, Request, Response } from "express";
import { type GetPostsProps, GetPosts } from "../controllers/post";
import { jwtValidate } from "./middleware";

const PostRouter = Router();

PostRouter.get(
  "/",
  jwtValidate,
  async (req: Request<never, never, never, GetPostsProps>, res: Response) => {
    const [c, r] = await GetPosts(req.query);
    return res.status(200).send(r);
  }
);

export default PostRouter;
