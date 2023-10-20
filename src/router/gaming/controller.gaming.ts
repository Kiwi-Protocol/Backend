import type { ApiResponse } from "../../index";
import { KiwiAvatarModel } from "../../models/kiwiAvatar.model";
import { AchievmentModel } from "../../models/achievment.model";

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
      const data = await KiwiAvatarModel.updateOne(
        { _id: avatar_id },
        { experience: avatar.experience + achievment.experience }
      );
      return { status: 200, message: "ok", data };
    } catch (error: any) {
      return { status: 500, message: "error", error };
    }
  }
}

export default new GamingController();
