import { Router } from "express";
import controller from "./posts.controller";

const router = Router();
router.get('/', controller.readPosts);
router.get('/:id', controller.getPost);
router.get('/search', controller.searchPost);
router.post('/', controller.addPost);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.deletePost);

module.exports = router;