import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser, UserSchema } from "./user.model";

export interface IAchievment extends Document {
  name: string;
  description: string;
  image_url: string;
  experience: number;
  creator: IUser;
}

export const AchievmentSchema: Schema = new mongoose.Schema<IAchievment>({
  name: String,
  description: String,
  image_url: String,
  experience: Number,
  creator: UserSchema,
});

export const AchievmentModel: Model<IAchievment> =
  mongoose.models.achievment ||
  mongoose.model<IAchievment>("achievment", AchievmentSchema);
