import { Router, Request, Response } from "express";
import HealthController from "./controller.health";
import type { appHealthCheckResponse } from "./helper.health";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: appHealthCheckResponse =
    await HealthController.appHealthCheck();
  res.status(result.status).json(result);
});

export default router;
