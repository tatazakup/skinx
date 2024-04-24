import express, { Express } from "express";
import cors from "cors";
import db from "./db/models";
import routes from "./routes";
import { ENV } from "./configs/env.config";

const corsOptions = {
  origin: ENV.CORS,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

if (db?.sequelize) db.sequelize.sync();
const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.listen(ENV.PORT, () =>
  console.log(`Server running on http://localhost:${ENV.PORT}`)
);
