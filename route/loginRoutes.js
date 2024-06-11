import express from "express";
import { getForm, submitForm } from "../controller/form.controller.js";

const router = express.Router();

router.get("/", getForm);
router.post("/", submitForm);

export default router;
