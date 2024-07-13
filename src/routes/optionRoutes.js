import express from "express";
import { deleteOption, addVote } from "../controllers/optionController.js";

const router = express.Router();

router.delete("/:id/delete", deleteOption);
router.post("/:id/add_vote", addVote);

export default router;
