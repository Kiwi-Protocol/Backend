import mongoose, { Document, Model, Schema } from "mongoose";

interface IAsset extends Document {
  name: string;
  cid: string;
  image_url: string;
  type: string;
}

const IAssetSchema: Schema = new mongoose.Schema<IAsset>({
  name: String,
  cid: String,
  image_url: String,
  type: {
    type: String,
    enum: ["HAIR", "EYES", "MOUTH"],
  },
});

export const AssetModel: Model<IAsset> =
  mongoose.models.iasset || mongoose.model<IAsset>("asset", IAssetSchema);

interface IKiwiAvatarCharacteristics extends Document {
  hair: IAsset;
  eyes: IAsset;
  mouth: IAsset;
}

const KiwiAvatarCharacteristicsSchema: Schema =
  new mongoose.Schema<IKiwiAvatarCharacteristics>({
    hair: IAssetSchema,
    eyes: IAssetSchema,
    mouth: IAssetSchema,
  });

interface IKiwiAvatar extends Document {
  name: string;
  characteristics: IKiwiAvatarCharacteristics;
  experience: number;
}

const KiwiAvatarSchema: Schema = new mongoose.Schema<IKiwiAvatar>({
  name: String,
  characteristics: KiwiAvatarCharacteristicsSchema,
  experience: Number,
});

export const KiwiAvatarModel: Model<IKiwiAvatar> =
  mongoose.models.kiwiavatar ||
  mongoose.model<IKiwiAvatar>("kiwiavatar", KiwiAvatarSchema);