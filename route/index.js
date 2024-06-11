import express from "express";
import AccountRoutes from "./AccountRoutes.js";
import loginRoutes from "./loginRoutes.js";

const router = express.Router();

router.use("/", loginRoutes);
router.use("/account", AccountRoutes);

export default router;
