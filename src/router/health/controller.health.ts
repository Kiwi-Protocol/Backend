import type { appHealthCheckResponse } from "./helper.health.js";

class HealthController {
  async appHealthCheck(): Promise<appHealthCheckResponse> {
    return { status: 200, message: "ok" };
  }
}

export default new HealthController();
