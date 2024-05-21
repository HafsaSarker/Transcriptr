import express from "express";

import TranscribeRouter from "./transcribe";

const router = express.Router();

export default (): express.Router => {
  TranscribeRouter(router);

  return router;
};
