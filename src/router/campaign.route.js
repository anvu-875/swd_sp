import { Router } from 'express';
import {
  //   createCampaign,
  getAllCampaigns
} from '../controllers/campaign.controller.js';

const router = Router();

router.route('/').get(getAllCampaigns);

export default router;
