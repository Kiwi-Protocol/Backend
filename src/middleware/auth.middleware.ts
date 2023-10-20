import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "index";
import { AchievmentModel } from "../models/achievment.model";
import { isAddress, recoverAddress } from "viem";

export const authMiddleware = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const { address, hash, signature } = req.body;

  if (!address || !hash || !signature || !isAddress(address)) {
    return res.json({
      message: "",
      status: 401,
      error: new Error("Invalid or missing data"),
    });
  }

  const recoveredAddress = await recoverAddress({
    hash,
    signature,
  });

  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    return res.json({
      message: "",
      status: 401,
      error: new Error("Unauthorized"),
    });
  }

  return next();
};

export const apiAuthMiddleware = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  const achievment = await AchievmentModel.findById(req.body.achievment_id);
  if (!achievment) {
    return res.json({
      message: "",
      status: 404,
      error: new Error("Achievment not found"),
    });
  }
  const api_key = req.headers.apikey;
  if (!api_key) {
    return res.json({
      message: "",
      status: 401,
      error: new Error("API key not found"),
    });
  }
  if (api_key !== achievment.creator.api_key) {
    return res.json({
      message: "",
      status: 401,
      error: new Error("Unauthorized"),
    });
  }
  return next();
};
