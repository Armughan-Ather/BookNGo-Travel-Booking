import { Router } from "express";
import { allHotels } from "../controllers/hotel.controller.js";
import { searchHotels } from "../controllers/hotel.controller.js";

const router = Router()

router.route("/hotels").post(allHotels)
router.route("/searchHotels").post(searchHotels)

export default router;