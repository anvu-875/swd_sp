import { Router } from 'express';
import {
  getAllRecords,
  getResponseById
} from '../controllers/response.controller.js';

const router = Router();

router.route('/all/:surveyId').get(getAllRecords);

router.route('/:responseId').get(getResponseById);

export default router;
