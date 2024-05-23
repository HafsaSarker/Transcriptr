import express from "express";

import TranscribeRouter from "./transcribe";
import SummarizeRouter from "./summarize";

const router = express.Router();

export default (): express.Router => {
  TranscribeRouter(router);
  SummarizeRouter(router);

  return router;
};
