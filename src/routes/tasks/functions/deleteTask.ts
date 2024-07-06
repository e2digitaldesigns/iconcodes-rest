import mongoose from "mongoose";
import { TaskModel } from "../../../models/task.model";

const ObjectId = mongoose.Types.ObjectId;

export const deleteTask = async (userId: string, taskId: string) => {
  try {
    const task = await TaskModel.findOne({
      _id: new ObjectId(taskId),
      userId: new ObjectId(userId)
    });
    if (!task) {
      throw new Error("Task not found.");
    }
    await task.deleteOne();
    return {
      resultStatus: {
        error: null,
        responseCode: 200,
        resultMessage: "Task deleted successfully.",
        success: true
      },
      result: null
    };
  } catch (error: unknown) {
    console.error("Task deletion error:", error);
    return {
      resultStatus: {
        error: error instanceof Error ? error.message : "Unknown error",
        responseCode: 400,
        resultMessage: "Task deletion failed.",
        success: false
      },
      result: null
    };
  }
};
