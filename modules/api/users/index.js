import express from "express";
import controller from "./users.controller";
const router = express.Router();

router.get("/", controller.get);

export default router;
