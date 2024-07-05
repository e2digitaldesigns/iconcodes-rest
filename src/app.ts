if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express, { Express, Request, Response } from "express";
import { dbConnector } from "./startUpServices/dbConnector";
import { routing } from "./routes";

const app: Express = express();
app.use(require("cors")());

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Step 01) Server is listening on port ${PORT}`));

dbConnector();

routing(app);

app.get("/", async (req: Request, res: Response) => {
  res.send("iConCodes: REST Service");
});
