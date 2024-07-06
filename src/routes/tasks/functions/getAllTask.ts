import { TaskModel } from "../../../models/task.model";

export const getAllTask = async (userId: string) => {
  try {
    const tasks = await TaskModel.find({
      userId
    });

    const parsedTasks = tasks.map(task => ({
      id: task._id,
      description: task.description,
      completed: task.completed
    }));

    return {
      resultStatus: {
        error: null,
        responseCode: 200,
        resultMessage: "Tasks fetched successfully.",
        success: true
      },
      result: {
        tasks: parsedTasks,
        totalTasks: parsedTasks.length,
        completedTasks: parsedTasks.filter(task => task.completed).length
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
