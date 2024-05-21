import { Request, Response } from "express";

async function test(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "wohoo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const exampleController = {
  test,
};
