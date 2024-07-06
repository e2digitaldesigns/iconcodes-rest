import { TaskModel } from "../../../models/task.model";

export const createTask = async (userId: string, description: string) => {
  try {
    const task = new TaskModel({
      userId,
      description
    });

    const result = await task.save();

    return {
      resultStatus: {
        error: null,
        responseCode: 200,
        resultMessage: "Task created successfully.",
        success: true
      },
      result: {
        id: result._id,
        description: result.description,
        completed: result.completed
      }
    };
  } catch (error: unknown) {
    return {
      resultStatus: {
        error: error instanceof Error ? error.message : "Unknown error",
        responseCode: 400,
        resultMessage: "Task creation failed.",
        success: false
      },
      result: null
    };
  }
};
