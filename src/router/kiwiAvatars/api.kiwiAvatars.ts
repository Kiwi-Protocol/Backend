import { Router, Request, Response } from "express";
import type { ApiResponse } from "../../index";
import kiwiAvatarController from "./controller.kiwiAvatars";
import { createAvatar } from "./helper.kiwiAvatars";
import Jimp from "jimp";

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

  const imagePaths = result.data;
  const generatedImage = await createAvatar(
    imagePaths[0],
    imagePaths[1],
    imagePaths[2]
  );

  if (generatedImage) {
    const base64Image = await generatedImage.getBase64Async(Jimp.MIME_PNG);

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": base64Image.length,
    });
    res.end(base64Image);
    
    // res.end(Buffer.from(base64Image, "base64"));
    // generatedImage.write("./helu.png");

  } else res.json({ error: "An error occcurred while generating image" });
});

export default router;
