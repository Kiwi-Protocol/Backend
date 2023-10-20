import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  wallet_address: string;
  api_key: string;
}

export const UserSchema: Schema = new mongoose.Schema<IUser>({
  name: String,
  email: String,
  wallet_address: String,
  api_key: String,
});

export const UserModel: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", UserSchema);
