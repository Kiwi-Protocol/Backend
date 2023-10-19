import { Router } from "express";
import HealthController from "./controller.health";
import type { appHealthCheckResponse } from "./helper.health";

const router: Router = Router();

router.get("/", async () => {
  const result: appHealthCheckResponse =
    await HealthController.appHealthCheck();
  return result;
});

export default router;
