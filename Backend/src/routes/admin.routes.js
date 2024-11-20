import { Router } from "express";
import { loginAdmin } from "../controllers/admin.controller.js";
import { updateHotelReservationStatuses } from "../controllers/admin.controller.js";
import { updateFlightReservationStatuses } from "../controllers/admin.controller.js";
import { updateBundleReservationStatuses } from "../controllers/admin.controller.js";

const router = Router()

router.route("/login").post(loginAdmin)
router.route("/updateHotelReservationStatuses").get(updateHotelReservationStatuses)
router.route("/updateFlightReservationStatuses").get(updateFlightReservationStatuses)
router.route("/updateBundleReservationStatuses").get(updateBundleReservationStatuses)

export default router;