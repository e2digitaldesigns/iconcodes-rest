import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const verifyApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("API Key is missing");
    }

    const user = await UserModel.findOne({
      _id: new ObjectId(req.headers.authorization as string),
      allowAccess: true
    });

    if (!user) {
      throw new Error("Invalid API Key");
    }

    res.locals.userId = user._id;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
