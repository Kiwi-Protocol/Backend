import type { ApiResponse } from "../../index";
import {
  KiwiAvatarModel,
  AssetModel,
  IAsset,
} from "../../models/kiwiAvatar.model";

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
        (characteristic: any) => characteristic.id
      );
      const characteristicsToAdd: Array<IAsset> = await AssetModel.find({
        id: characteristics,
      });

      const data = await KiwiAvatarModel.create({
        characteristics: characteristicsToAdd,
        name: name,
        experience: 0,
      });
      return { status: 200, message: "ok", data };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }

  //used to update the avatar when the user changes its design
  //will get characteristics array and update the avatars
  async updateKiwiAvatar(params: any, body: any): Promise<ApiResponse> {
    try {
      const data = await KiwiAvatarModel.updateOne({ id: params.id }, body);
      return { status: 200, message: "ok", data };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }

  //used to delete the avatar when the user burns his minted avatar
  async deleteKiwiAvatar(params: any): Promise<ApiResponse> {
    try {
      const data = await KiwiAvatarModel.deleteOne({ id: params.id });
      return { status: 200, message: "ok", data };
    } catch (err: any) {
      return { status: 500, message: "error", error: err };
    }
  }
}

export default new kiwiAvatarController();
