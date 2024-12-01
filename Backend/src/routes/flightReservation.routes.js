import { Router } from "express";
import { reserveFlight } from "../controllers/flightReservation.controller.js";
import { updateFlightReservation } from "../controllers/flightReservation.controller.js";

const router = Router()

router.route("/reserveFlight").post(reserveFlight)
router.route("/updateFlightReservation").post(updateFlightReservation)

export default router;