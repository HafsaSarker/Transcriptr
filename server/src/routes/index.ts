import express from "express";

import ExampleRouter from "./example";

const router = express.Router();

export default (): express.Router => {
  ExampleRouter(router);
  // more router here
  return router;
};
