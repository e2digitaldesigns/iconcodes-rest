import mongoose from "mongoose";
import { TaskModel } from "../../../models/task.model";

const ObjectId = mongoose.Types.ObjectId;

export const updateTask = async (
  userId: string,
  taskId: string,
  description: string,
  completed: boolean
) => {
  try {
    const task = await TaskModel.findOne({
      _id: new ObjectId(taskId),
      userId: new ObjectId(userId)
    });

    if (!task) {
      throw new Error("Task not found.");
    }

    if (description) {
      task.description = description;
    }

    if (completed !== undefined) {
      task.completed = completed;
    }

    await task.save();

    return {
      resultStatus: {
        error: null,
        responseCode: 200,
        resultMessage: "Task updated successfully.",
        success: true
      },
      result: {
        id: task._id,
        description: task.description,
        completed: task.completed
      }
    };
  } catch (error: unknown) {
    return {
      resultStatus: {
        error: error instanceof Error ? error.message : "Unknown error",
        responseCode: 400,
        resultMessage: "Task update failed.",
        success: false
      },
      result: null
    };
  }
};
