import type { ApiResponse } from "../../index";
import { AchievmentModel } from "../../models/achievment.model";
import { UserModel } from "../../models/user.model";

class AchievmentController {
  async getAchievment(query: any): Promise<ApiResponse> {
    try {
      const achievments = await AchievmentModel.find(query);
      return {
        status: 200,
        message: "Achievments found",
        data: achievments,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal server error",
        data: error,
      };
    }
  }

  async createAchievment(body: any): Promise<ApiResponse> {
    try {
      const { creator_id, name, description, image_url, experience } = body;
      const creator = await UserModel.findById(creator_id);
      if (!creator) {
        return {
          status: 404,
          message: "Creator not found",
          data: null,
        };
      }
      const achievment = await AchievmentModel.create({
        name,
        description,
        image_url,
        creator,
        experience,
      });
      return {
        status: 200,
        message: "Achievment created",
        data: achievment,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal server error",
        data: error,
      };
    }
  }

  async deleteAchievment(params: any): Promise<ApiResponse> {
    try {
      const achievment = await AchievmentModel.deleteOne({ _id: params.id });
      return {
        status: 200,
        message: "Achievment deleted",
        data: achievment,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal server error",
        data: error,
      };
    }
  }
}

export default new AchievmentController();
