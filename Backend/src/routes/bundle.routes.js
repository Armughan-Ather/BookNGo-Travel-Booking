import { Router } from "express";
import { searchValidBundles } from "../controllers/bundle.controller.js";
import { getBundleCost } from "../controllers/bundle.controller.js";

const router = Router()

router.route("/getBundleCost").post(getBundleCost)
router.route("/searchValidBundles").get(searchValidBundles)

export default router;