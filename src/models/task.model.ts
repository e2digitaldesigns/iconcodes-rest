import { model, Schema, Types } from "mongoose";

interface ITask {
  userId: Types.ObjectId;
  description: string;
  completed: boolean;
}

const taskSchema = new Schema<ITask>({
  userId: { type: Schema.Types.ObjectId, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false }
});

export const TaskModel = model<ITask>("tasks", taskSchema);
