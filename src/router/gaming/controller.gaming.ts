import type { ApiResponse } from "../../index";
import { AssetModel, KiwiAvatarModel } from "../../models/kiwiAvatar.model";
import { AchievmentModel } from "../../models/achievment.model";
import kiwiAvatarController from "../kiwiAvatars/controller.kiwiAvatars";

class GamingController {
  async updateAvatarExperience(body: any): Promise<ApiResponse> {
    try {
      const { avatar_id, achievment_id } = body;
      const avatar = await KiwiAvatarModel.findById(avatar_id);
      if (!avatar) {
        return { status: 404, message: "Avatar not found", data: null };
      }
      const achievment = await AchievmentModel.findById(achievment_id);
      if (!achievment) {
        return { status: 404, message: "Achievment not found", data: null };
      }

      const newCharacteristics: any[] = [];
      let stage = "COMMON";
      if (avatar.experience + achievment.experience < 20) {
        stage = "COMMON";
      } else if (avatar.experience + achievment.experience < 40) {
        stage = "RARE";
      } else {
        stage = "EPIC";
      }

      await Promise.all(
        Object.values(avatar.characteristics).map(async (value) => {
          const newAsset = await AssetModel.findOne({
            type: value.type,
            stage: stage,
            name: value.name,
          });
          newCharacteristics.push({ id: newAsset?._id });
        })
      );

      const data = await KiwiAvatarModel.updateOne(
        { _id: avatar_id },
        {
          experience: avatar.experience + achievment.experience,
          achievments: [...avatar.achievments, achievment],
        }
      );

      const body2 = {
        characteristics: newCharacteristics,
      };
      const params = {
        id: avatar_id,
      };

      const updateResult = await kiwiAvatarController.updateKiwiAvatar(
        params,
        body2
      );
      return {
        status: 200,
        message: "ok",
        data: {
          data,
          updateResult,
        },
      };
    } catch (error: any) {
      return { status: 500, message: "error", error };
    }
  }
}

export default new GamingController();
