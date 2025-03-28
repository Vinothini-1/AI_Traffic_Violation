import { Router } from 'express';
import { 
    validateTimeTable, 
    validateTimeTableIdParam 
} from '../middleware/ValidatorMiddleware.js';

import { 
    getAllTimeTables, 
    createTimeTable, 
    getSingleTimeTable, 
    updateTimeTable, 
    deleteTimeTable 
} from '../Controllers/TimeTableController.js';

const router = Router();

router.route('/')
    .get(getAllTimeTables)   // Get all TimeTable entries
    .post(validateTimeTable, createTimeTable);  // Create new TimeTable entry

router.route('/:id')
    .get(validateTimeTableIdParam, getSingleTimeTable)  // Get a single TimeTable entry by ID
    .patch(validateTimeTableIdParam, validateTimeTable, updateTimeTable)  // Update TimeTable entry by ID
    .delete(validateTimeTableIdParam, deleteTimeTable);  // Delete TimeTable entry by ID

export default router;
