import { Dialect } from "sequelize";

require("dotenv").config();

export const ENV = {
  DATABASE: {
    DIALECT: process.env.MYSQLDB_DIALECT as Dialect,
    USER: process.env.MYSQLDB_USER as string,
    HOST: process.env.MYSQLDB_HOST as string,
    DATABASE: process.env.MYSQLDB_DATABASE as string,
    PASSWORD: process.env.MYSQLDB_PASSWORD as string,
    PORT: Number(process.env.MYSQLDB_PORT) as number,
  },
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE as string,
  },
  PORT: Number(process.env.NODE_DOCKER_PORT) as number,
  CORS: process.env.CLIENT_ORIGIN as string,
};
