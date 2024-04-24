import { Request, Response, NextFunction } from "express";
import { ENV } from "../configs/env.config";
import jwt from "jsonwebtoken";

export const jwtValidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieString = req.headers.cookie;
    if (!cookieString) throw new Error();

    let accessToken;
    let refreshToken;

    const cookies = cookieString.split("; ");

    cookies.forEach((cookie) => {
      const parts = cookie.split("=");
      const name = parts[0];
      const value = parts[1];

      if (name === "accessToken") {
        accessToken = value;
      } else if (name === "refreshToken") {
        refreshToken = value;
      }
    });

    if (!accessToken || !refreshToken) {
      throw new Error();
    }

    jwt.verify(accessToken, ENV.JWT.ACCESS_SECRET, (err, decoded) => {
      if (err) throw new Error();
    });

    next();
  } catch (error) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.sendStatus(403);
  }
};
