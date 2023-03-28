import dotenv from "dotenv";
dotenv.config();
import { env } from "./utility/envParser";

import app from "./app";

app.listen(env.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${env.PORT} for EXPRESS_TS_BOILERPLATE`);
  });