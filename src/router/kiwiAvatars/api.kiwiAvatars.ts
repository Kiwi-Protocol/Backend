import { Router, Request, Response } from "express";
import type { ApiResponse } from "../../index";
import kiwiAvatarController from "./controller.kiwiAvatars";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.getKiwiAvatar(
    req.query
  );
  res.status(result.status).json(result);
});

router.post("/", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.createKiwiAvatar(
    req.body
  );
  res.status(result.status).json(result);
});

router.patch("/:id", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.updateKiwiAvatar(
    req.params,
    req.body
  );
  res.status(result.status).json(result);
});

router.delete("/:id", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.deleteKiwiAvatar(
    req.params
  );
  res.status(result.status).json(result);
});

router.post("/generate", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.generateKiwiAvatar(
    req.body
  );
  return res.status(result.status).json(result);
});

router.get("/assets", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.getAssetsByType(
    req.query
  );
  return res.status(result.status).json(result);
});

router.get("/assets/:id", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.getAssetById(
    req.params
  );
  return res.status(result.status).json(result);
});

router.get("/:id", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result: ApiResponse = await kiwiAvatarController.getKiwiAvatarById(
    req.params
  );
  return res.status(result.status).json(result);
});

router.get("/tokenUri/:tokenId", async (req: Request, res: Response) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result = await kiwiAvatarController.getKiwiAvatarByTokenId(req.params);
  return res.status(result.status).json(result);
});

export default router;
