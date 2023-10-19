import type { ApiResponse } from "../../index";
import TestModel from "../../models/test.model";

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
}

export default new HealthController();
