import mongoose from "mongoose";
import type { ApiResponse } from "../../index";
import {
  KiwiAvatarModel,
  AssetModel,
  IAsset,
} from "../../models/kiwiAvatar.model";
import { createAvatar } from "./helper.kiwiAvatars";
import { uploadToStorage } from "../../utils/upload";
import { mint, getTokenId } from "../../utils/mint";

class kiwiAvatarController {
  //for get query will be of the form {id: "some id", type: "some type",etc}
  async getKiwiAvatar(query: any): Promise<ApiResponse> {
    try {
      const data = await KiwiAvatarModel.find(query);
      return { status: 200, message: "ok", data };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }

  //used to mint the avatar (more like avatar id since the components of the avatar are on the blockchain)
  //body here will be {characteristics:{hair:IAssetSchema,eyes:IAssetSchema,mouth:IAssetSchema},experience:number,etc}
  //characteristics might only come as name and type and will have to get from db. (TODO need to discuss)
  async createKiwiAvatar(body: any): Promise<ApiResponse> {
    try {
      const name: string = body.name;
      const characteristics = body.characteristics.map(
        (characteristic: any) => new mongoose.Types.ObjectId(characteristic.id)
      );
      const characteristicsToAdd: Array<IAsset> = await AssetModel.find({
        _id: { $in: characteristics },
      });
      const imagePaths: Array<string> = characteristicsToAdd.map(
        (characteristic: IAsset) => {
          return characteristic.image_url;
        }
      );

      const generatedImage = await createAvatar(
        imagePaths[0],
        imagePaths[1],
        imagePaths[2]
      );

      if (!generatedImage) {
        return {
          status: 501,
          message: "error generating image",
        };
      }
      const imageData = await uploadToStorage(generatedImage);
      await mint(body.wallet_address, imageData.url);
      const tokenId = await getTokenId();

      const kiwiAvatarCharacteristics: Record<string, any> = {};
      characteristicsToAdd.forEach((characteristic: IAsset) => {
        kiwiAvatarCharacteristics[characteristic.type.toLowerCase()] =
          characteristic;
      });

      const data = await KiwiAvatarModel.create({
        characteristics: kiwiAvatarCharacteristics,
        name: name,
        experience: 0,
        tokenId: tokenId,
      });
      return {
        status: 200,
        message: "ok",
        data: {
          imageData,
          data,
        },
      };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }

  //used to update the avatar when the user changes its design
  //will get characteristics array and update the avatars
  async updateKiwiAvatar(params: any, body: any): Promise<ApiResponse> {
    try {
      const characteristics = body.characteristics.map(
        (characteristic: any) => new mongoose.Types.ObjectId(characteristic.id)
      );
      const characteristicsToAdd: Array<IAsset> = await AssetModel.find({
        _id: { $in: characteristics },
      });
      const kiwiAvatarCharacteristics: Record<string, any> = {};
      characteristicsToAdd.forEach((characteristic: IAsset) => {
        kiwiAvatarCharacteristics[characteristic.type.toLowerCase()] =
          characteristic;
      });
      await KiwiAvatarModel.updateOne(
        { _id: params.id },
        { characteristics: kiwiAvatarCharacteristics }
      );
      const data = await KiwiAvatarModel.find({ _id: params.id });
      return { status: 200, message: "ok", data };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }

  //used to delete the avatar when the user burns his minted avatar
  async deleteKiwiAvatar(params: any): Promise<ApiResponse> {
    try {
      const data = await KiwiAvatarModel.deleteOne({ _id: params.id });
      return { status: 200, message: "ok", data };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }

  //used to generate image on the basis of the stuff sent by the user
  async generateKiwiAvatar(body: any): Promise<ApiResponse> {
    try {
      const characteristics = body.characteristics.map(
        (characteristic: any) => new mongoose.Types.ObjectId(characteristic.id)
      );
      const characteristicsToAdd: Array<IAsset> = await AssetModel.find({
        _id: { $in: characteristics },
      });
      const imagePaths: Array<string> = characteristicsToAdd.map(
        (characteristic: IAsset) => {
          return characteristic.image_url;
        }
      );
      const generatedImage = await createAvatar(
        imagePaths[0],
        imagePaths[1],
        imagePaths[2]
      );

      if (generatedImage) {
        const data = await uploadToStorage(generatedImage);
        return { status: 200, message: "ok", data };
      }

      return {
        status: 200,
        message: "error creating avatar",
        data: imagePaths,
      };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }
}

export default new kiwiAvatarController();
