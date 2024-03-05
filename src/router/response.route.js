import { Router } from 'express';
import {
  getAllRecords,
  getResponseById,
  getResponseByIdAndDelete
} from '../controllers/response.controller.js';

const router = Router();

router.route('/all/:surveyId').get(getAllRecords);

router.route('/:responseId').get(getResponseById);

router.route('/:responseId').delete(getResponseByIdAndDelete);

export default router;
