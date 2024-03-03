import { Router } from "express";
import { createCampaign } from "../controllers/campaign.controller.js";

   const router = Router();

    router.route('/').put(createCampaign)

export default router;