import { Router, Request, Response } from "express";
import HealthController from "./controller.health";
import type { ApiResponse } from "../../index";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await HealthController.appHealthCheck();
  res.status(result.status).json(result);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await HealthController.dbHealthCheck();
  res.status(result.status).json(result);
});

export default router;
