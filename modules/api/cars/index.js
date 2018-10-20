import express from "express";
import controller from "./cars.controller";
const router = express.Router();

router.get("/", controller.get);
router.post("/", controller.create);
router.patch("/", controller.update);
router.delete("/:id", controller.delete);

export default router;
