const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { ENV } from "../configs/env.config";
import db from "../db/models";

export type SigninProps = {
  username: string;
  password: string;
};

export const Signin = async (
  props: SigninProps
): Promise<
  [
    number,
    {
      access: string;
      refresh: string;
    } | null
  ]
> => {
  const user = await db.user.findOne({
    where: { username: props.username },
  });

  if (!user) return [1, null];

  const passwordMatch = await bcrypt.compare(
    props.password,
    user.dataValues.password
  );

  if (!passwordMatch) return [2, null];

  const AccessToken = jwt.sign({ userId: user.id }, ENV.JWT.ACCESS_SECRET, {
    expiresIn: ENV.JWT.ACCESS_EXPIRE,
  });

  const RefreshToken = jwt.sign({ userId: user.id }, ENV.JWT.REFRESH_SECRET, {
    expiresIn: ENV.JWT.REFRESH_EXPIRE,
  });

  user.refresh = RefreshToken;

  user.save();

  return [0, { access: AccessToken, refresh: RefreshToken }];
};
