import { model, Schema, Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  allowAccess?: boolean;
  username: string;
}

const userSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, required: true },
  allowAccess: { type: Boolean, default: false },
  username: { type: String, required: true }
});

export const UserModel = model<IUser>("users", userSchema);
