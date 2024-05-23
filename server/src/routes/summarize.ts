import { summarizeController } from "../controllers/summarize";
import express from "express";

export default (router: express.Router) => {
  router.post("/summarize", summarizeController.summarize);
};
