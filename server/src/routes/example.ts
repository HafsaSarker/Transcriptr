import { exampleController } from "../controllers/example";
import express from "express";

export default (router: express.Router) => {
  router.get("/test", exampleController.test);
  // more routes here
};
