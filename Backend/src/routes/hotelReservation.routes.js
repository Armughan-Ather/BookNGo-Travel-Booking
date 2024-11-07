import { Router } from "express";
import { reserveHotelRoom } from "../controllers/hotelReservation.controller.js";

const router = Router()

router.route("/reserveHotelRoom").post(reserveHotelRoom)

export default router;