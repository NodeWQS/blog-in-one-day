import { Router } from "express";
import controller from './upload.controller';

const router = Router();
router.get('/:name', controller.getPhoto);
router.delete('/:name', controller.delete);
router.put('/:name', controller.update);

module.exports = router;