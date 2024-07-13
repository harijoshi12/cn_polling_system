import express from "express";
import {
  createQuestion,
  getQuestion,
  deleteQuestion,
  addOption,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/create", createQuestion);
router.get("/:id", getQuestion);
router.delete("/:id/delete", deleteQuestion);
router.post("/:id/options/create", addOption);

export default router;
