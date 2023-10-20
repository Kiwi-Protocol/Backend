import type { ApiResponse } from "../../index";
import { UserModel } from "../../models/user.model";

class UserController {
  async getUser(query: any): Promise<ApiResponse> {
    try {
      const users = await UserModel.find(query);
      return {
        status: 200,
        message: "Users found",
        data: users,
      };
    } catch (error: any) {
      return {
        status: 500,
        message: "Internal server error",
        data: error,
      };
    }
  }

  async createUser(body: any): Promise<ApiResponse> {
    try {
      const api_key =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const user = await UserModel.create({ ...body, api_key });
      return {
        status: 200,
        message: "User created",
        data: user,
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

export default new UserController();
