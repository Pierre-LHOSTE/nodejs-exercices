import express from "express";
import { getProfile, logout } from "../controller/account.controller.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/logout", logout);

export default router;
