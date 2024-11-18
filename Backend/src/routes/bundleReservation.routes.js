import { Router } from "express";
import { reserveBundle } from "../controllers/bundleReservation.controller.js";

const router = Router()

router.route("/reserveBundle").get(reserveBundle)

export default router;