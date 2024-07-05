import express, { Request, Response } from "express";
import { verifyApiKey } from "../middleware/verifyApiKey";
import { TaskModel } from "../models/task.model";

const router = express.Router();

router.use(verifyApiKey);

router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find({
      userId: res.locals.userId
    });

    const parsedTasks = tasks.map(task => ({
      id: task._id,
      description: task.description,
      completed: task.completed
    }));

    res.status(201).send({
      status: {
        message: "Tasks fetched successfully",
        success: true
      },
      data: {
        tasks: parsedTasks,
        totalTasks: parsedTasks.length,
        completedTasks: parsedTasks.filter(task => task.completed).length
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body.description) {
      return res.status(400).send({
        status: {
          message: "Task description is required",
          success: false
        }
      });
    }

    const task = new TaskModel({
      userId: res.locals.userId,
      description: req.body.description
    });

    const result = await task.save();

    const data = {
      status: {
        message: "Task created successfully",
        success: true
      },
      data: {
        id: result._id,
        description: result.description,
        completed: result.completed
      }
    };

    res.status(201).send(data);
  } catch (error: unknown) {
    res.status(500).send({
      status: {
        message: "Task creation failed",
        error: error instanceof Error ? error.message : "Unknown error",
        success: false
      }
    });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findOne({
      _id: req.params.id,
      userId: res.locals.userId
    });

    if (!task) {
      return res.status(404).send({
        status: {
          message: "Task not found",
          success: false
        }
      });
    }

    if (req.body.description) {
      task.description = req.body.description;
    }

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    await task.save();

    res.status(200).send({
      status: {
        message: "Task updated successfully",
        success: true
      },
      data: {
        id: task._id,
        description: task.description,
        completed: task.completed
      }
    });
  } catch (error) {
    res.status(500).send({
      status: {
        message: "Task update failed",
        error: error instanceof Error ? error.message : "Unknown error",
        success: false
      }
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findOne({
      _id: req.params.id,
      userId: res.locals.userId
    });

    if (!task) {
      return res.status(404).send({
        status: {
          message: "Task not found",
          success: false
        }
      });
    }

    await task.deleteOne();

    res.status(200).send({
      status: {
        message: "Task deleted successfully",
        success: true
      }
    });
  } catch (error: unknown) {
    console.error("Task deletion error:", error);
    res.status(500).send({
      status: {
        message: "Task deletion failed",
        error: error instanceof Error ? error.message : "Unknown error",
        success: false
      }
    });
  }
});

export const tasks = router;
