import { Router } from "express";
import { apiAuthMiddleware } from "../../middleware/auth.middleware";
import GamingController from "./controller.gaming";

const router: Router = Router();

router.patch("/", apiAuthMiddleware, async (req, res) => {
  console.log(`${req.originalUrl}-[${req.method}]`);
  const result = await GamingController.updateAvatarExperience(req.body);
  res.status(result.status).json(result);
});

export default router;
