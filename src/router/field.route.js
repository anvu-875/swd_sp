import { Router } from 'express';
import {
  createNewField,
  updateFieldById
} from '../controllers/field.controller.js';
import {
  validateSurveyFieldForCreate,
  validateSurveyFieldForUpdate,
  verifyFields
} from '../middleware/validateSurveyRes.middleware.js';

const router = Router();

router
  .route('/create/:surveyId')
  .post(validateSurveyFieldForCreate, verifyFields, createNewField);

router
  .route('/:id')
  .put(validateSurveyFieldForUpdate, verifyFields, updateFieldById);
export default router;
