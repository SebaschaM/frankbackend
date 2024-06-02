import express from "express";
import { saveDashboard, getDashboard } from "../controllers/dashboardController";

const router = express.Router();

router.post("/", saveDashboard);
router.get("/", getDashboard);

export default router;