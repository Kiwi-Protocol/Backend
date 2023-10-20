import { Router, Request, Response } from "express";
import type { ApiResponse } from "../../index";
import AchievmentController from "./controller.achievments";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await AchievmentController.getAchievment(
    req.query
  );
  res.status(result.status).json(result);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await AchievmentController.createAchievment(
    req.body
  );
  res.status(result.status).json(result);
});

router.delete("/:id", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await AchievmentController.deleteAchievment(
    req.params
  );
  res.status(result.status).json(result);
});

export default router;
