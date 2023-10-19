import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "index";
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
      error: new Error("Data provided is invalid or missing"),
    });
  }

  const recoveredAddress = await recoverAddress({
    hash,
    signature,
  });

  if (recoveredAddress !== address) {
    return res.json({
      message: "",
      status: 401,
      error: new Error("Incorrect Address, attempt to break through"),
    });
  }

  next();
};
