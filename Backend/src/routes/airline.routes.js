import { Router } from "express";
import { allAirlines } from "../controllers/airline.controller.js";

const router = Router()

router.route("/allAirlines").post(allAirlines)

export default router;