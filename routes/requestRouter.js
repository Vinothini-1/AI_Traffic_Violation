import { Router } from "express";
import { RetriveAllrequest , UpdateRequestStatus,RetrieveSpecificRequest} from "../Controllers/requestController.js";

const router = Router();

// Route to handle the GET request for retrieving all requests
router.get('/retriveRequest', RetriveAllrequest);
router.put('/updateRequestStatus/:id', UpdateRequestStatus);
router.get('/retrieveSpecificRequest/:id', RetrieveSpecificRequest); 


export default router;
