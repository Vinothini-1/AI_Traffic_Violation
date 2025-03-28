import { Router } from "express";
import { InsertVehicle, RetriveAllVehicle, RetrieveSpecificVehicle, UpdateVehicle, DeleteVehicle } from "../Controllers/vehicleController.js";

const router = Router();

router.post('/addVehicle', InsertVehicle);
router.get('/retrivevehicles', RetriveAllVehicle);
router.get('/retriveSpecificVehicle/:id', RetrieveSpecificVehicle);
router.put('/updatevehicle/:id', UpdateVehicle);
router.delete('/deleteVehicle/:id', DeleteVehicle);

export default router;