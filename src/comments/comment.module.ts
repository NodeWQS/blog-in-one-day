import { Router } from "express";
import controller from "./comment.controller";

const router = Router();
router.post('/', controller.addPost);
router.delete('/:id', controller.deletePost);

module.exports = router;