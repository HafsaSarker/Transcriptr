import { transcribeController } from "../controllers/transcribe";
import express from "express";

export default (router: express.Router) => {
  router.post("/transcribe", transcribeController.transcribe);
};
