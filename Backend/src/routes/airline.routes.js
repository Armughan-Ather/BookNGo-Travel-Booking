import { Router } from "express";
import { allAirlines } from "../controllers/airline.controller.js";

const router = Router()

router.route("/allAirlines").get(allAirlines)

export default router;