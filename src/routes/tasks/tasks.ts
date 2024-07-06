import express, { Request, Response } from "express";
import { verifyApiKey } from "../../middleware/verifyApiKey";
import * as taskFn from "./functions";

const router = express.Router();

router.use(verifyApiKey);

router.get("/", async (req: Request, res: Response) => {
  const data = await taskFn.getAllTask(res.locals.userId);
  res.status(data.resultStatus.responseCode).send(data);
});

router.post("/", async (req: Request, res: Response) => {
  const data = await taskFn.createTask(res.locals.userId, req.body.description);
  res.status(data.resultStatus.responseCode).send(data);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const data = await taskFn.updateTask(
    res.locals.userId,
    req.params.id,
    req.body.description,
    req.body.completed
  );

  res.status(data.resultStatus.responseCode).send(data);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const data = await taskFn.deleteTask(res.locals.userId, req.params.id);
  res.status(data.resultStatus.responseCode).send(data);
});

export const tasks = router;
