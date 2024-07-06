import express, { Express } from "express";
import { tasks } from "./tasks/tasks";

const prefix = "/api/v1/";

export const routing = (app: Express) => {
  app.use(express.json());
  app.use(prefix + "tasks", tasks);
};
