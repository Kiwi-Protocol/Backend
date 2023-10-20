import mongoose, { Document, Model, Schema } from "mongoose";
import { IAchievment, AchievmentSchema } from "./achievment.model";

export interface IAsset extends Document {
  name: string;
  image_url: string;
  type: string;
}

const IAssetSchema: Schema = new mongoose.Schema<IAsset>({
  name: String,
  image_url: String,
  type: {
    type: String,
    enum: ["HAIR", "EYES", "MOUTH"],
  },
});

export const AssetModel: Model<IAsset> =
  mongoose.models.iasset || mongoose.model<IAsset>("asset", IAssetSchema);

interface IKiwiAvatar extends Document {
  name: string;
  characteristics: {
    hair: IAsset;
    eyes: IAsset;
    mouth: IAsset;
  };
  experience: number;
  image: string | null | undefined;
  tokenId: number;
  cid: string;
  ipns_link: string | null | undefined;
  achievments: Array<IAchievment | null | undefined>;
}

const KiwiAvatarSchema: Schema = new mongoose.Schema<IKiwiAvatar>({
  name: String,
  characteristics: {
    hair: IAssetSchema,
    eyes: IAssetSchema,
    mouth: IAssetSchema,
  },
  experience: Number,
  image: String,
  tokenId: Number,
  cid: String,
  ipns_link: String,
  achievments: [AchievmentSchema],
});

export const KiwiAvatarModel: Model<IKiwiAvatar> =
  mongoose.models.kiwiavatar ||
  mongoose.model<IKiwiAvatar>("kiwiavatar", KiwiAvatarSchema);
