import { Router } from "express";
import controller from "./customer.controller";

const router = Router();
router.post('/signup', controller.add);
router.post('/signin', controller.login);
router.post('/verify', controller.verification);

module.exports = router;