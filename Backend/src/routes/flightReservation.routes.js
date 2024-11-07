import { Router } from "express";
import { reserveFlight } from "../controllers/flightReservation.controller.js";

const router = Router()

router.route("/reserveFlight").post(reserveFlight)

export default router;