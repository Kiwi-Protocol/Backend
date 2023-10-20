import type { ApiResponse } from "../../index";
import TestModel from "../../models/test.model";
import { AssetModel, IAsset } from "../../models/kiwiAvatar.model";
import { assetPack } from "./assets.example";
import { forEach } from "lodash";

class HealthController {
  async appHealthCheck(): Promise<ApiResponse> {
    return { status: 200, message: "ok" };
  }

  async dbHealthCheck(): Promise<ApiResponse> {
    try {
      const data = await TestModel.create({ name: "test", age: 1 });
      return { status: 200, message: "ok", data };
    } catch (error: any) {
      return { status: 500, message: "error", error };
    }
  }

  async uploadAssets(): Promise<ApiResponse> {
    try {
      const assetsToBeAdded: Array<IAsset> = [];
      forEach(assetPack, (asset: any, assetType: any) => {
        forEach(asset, (assetItem: any) => {
          assetsToBeAdded.push({
            ...assetItem,
            type: assetType.toUpperCase(),
            stage: "EPIC",
          });
        });
      });
      const data = await AssetModel.insertMany(assetsToBeAdded);
      return { status: 200, message: "assets added successfully", data };
    } catch (error: any) {
      return { status: 500, message: "error", error };
    }
  }
}

export default new HealthController();
