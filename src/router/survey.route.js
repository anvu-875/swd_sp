import { Router } from 'express';
import {
  getAllSurveys,
  getSurveyById,
  updateSurveyById
} from '../controllers/survey.controller.js';
import {
  // createFields,
  getAllFields
} from '../controllers/field.controller.js';
import {
  validateSurveyForUpdate,
  verifyFields
} from '../middleware/validate.middleware.js';

const router = Router();

/* 
{
    "name": "Hahah",
    "start_time": 111111111111111,
    "end_time": 111111111111111,
    "campaign_id": "620b6996b8cfa2ac288d9d22",
    "fields": [
        {
            "type":  "dropdown",
            "default_value": "Customer",
            "name": "Role",
            "option": ["Customer", "Admin", "Staff"]
        },
        {
            "type":  "text",
            "default_value": "An",
            "name": "Ten",
        }
    ]
}
*/
router.route('/all/:campaignId').get(getAllSurveys);

router
  .route('/:id')
  .get(getSurveyById, getAllFields)
  .put(
    validateSurveyForUpdate,
    verifyFields('name', 'description'),
    updateSurveyById
  );

export default router;
