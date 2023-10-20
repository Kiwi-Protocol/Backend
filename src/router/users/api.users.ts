import { Router, Request, Response } from "express";
import type { ApiResponse } from "../../index";
import UserController from "./controller.users";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await UserController.getUser(req.query);
  res.status(result.status).json(result);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await UserController.createUser(req.body);
  res.status(result.status).json(result);
});

export default router;
