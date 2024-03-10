import { Router } from 'express';
import {
  createNewField,
  updateFieldById
} from '../controllers/field.controller.js';
import {
  validateSurveyFieldForCreate,
  validateSurveyFieldForUpdate,
  verifyFields
} from '../middleware/validate.middleware.js';

const router = Router();

router
  .route('/create/:surveyId')
  .post(
    validateSurveyFieldForCreate,
    verifyFields('name', 'description', 'type', 'options'),
    createNewField
  );

router
  .route('/:fieldId')
  .put(
    validateSurveyFieldForUpdate,
    verifyFields('name', 'description'),
    updateFieldById
  );
export default router;
