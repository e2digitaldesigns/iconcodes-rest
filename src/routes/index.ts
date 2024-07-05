import express, { Express } from "express";
import { tasks } from "./tasks";

const prefix = "/api/v1/";

export const routing = (app: Express) => {
  app.use(express.json());
  app.use(prefix + "tasks", tasks);
};

// apiKey=6686d2304e5f0b50d31c366a
