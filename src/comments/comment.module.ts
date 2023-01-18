import { Router } from "express";
import controller from "./comment.controller";

const router = Router();
router.post('/', controller.addComment);
router.delete('/:id', controller.deleteComment);

module.exports = router;
