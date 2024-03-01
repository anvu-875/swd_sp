import { Router } from 'express';
import { createSurvey } from '../controllers/survey.controller.js';
import { createFields } from '../controllers/field.controller.js';

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
            "question_text": "Role",
            "question_image": "",
            "option": ["Customer", "Admin", "Staff"]
        },
        {
            "type":  "text",
            "default_value": "An",
            "question_text": "Ten",
            "question_image": "",
            "option": null
        }
    ]
}
*/
router.route('/').post(createSurvey, createFields);

export default router;
