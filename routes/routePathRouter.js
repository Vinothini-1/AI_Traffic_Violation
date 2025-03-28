import { Router } from "express";
import { InsertRoutePath, RetriveAllRoutePath, DeleteRoutePath, RetrieveSpecificRoutePath, UpdateRoutePath } from "../Controllers/routePathController.js";

import {validateRoute} from "../middleware/ValidatorMiddleware.js"
const router = Router();

router.post('/addRoutePath',validateRoute, InsertRoutePath);

router.get('/retriveRoutePath', RetriveAllRoutePath);
router.get('/retriveSpecificRoutePath/:id', RetrieveSpecificRoutePath); //kavidu
router.put('/updateRoutePath/:id', UpdateRoutePath);
router.delete('/deleteRoutePath/:id', DeleteRoutePath);

export default router;
