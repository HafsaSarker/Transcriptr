import { Request, Response, NextFunction } from "express";

export const middlewareEx = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // do something here

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
