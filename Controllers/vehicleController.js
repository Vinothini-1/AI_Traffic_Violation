import Vehicle from "../models/VehicleModel.js";

export const InsertVehicle = async (req, res) => {
    console.log('Request Body:', req.body); 
    try {
        await Vehicle.create(req.body);
        res.json({ msg: "Vehicle added successfully" });
    } catch (error) {
        console.error('Insert Error:', error);
        res.status(400).json({ msg: "Insert failed", error: error.message });
    }
}

export const RetriveAllVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.find();
        res.json(vehicle);
    } catch (error) {
        console.error('Retrieve Error:', error);
        res.status(400).json({ msg: "Route not found", error: error.message });
    }
}

export const RetrieveSpecificVehicle = async(req, res) => {
    try{
        const getSpecificVehicle = await Vehicle.findById(req.params.id);
        res.json(getSpecificVehicle)
    }catch(error){
        console.error('Retrieve Specific Vehicle Error:', error);
        res.status(400).json({ msg: "Specific Vehicle Route not found", error: error.message });
    }
}


export const UpdateVehicle = async (req, res) => {
    try {

        const updateVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,  
            { new: true } 
        );

        if (!updateVehicle) {
            return res.status(404).json({ msg: "Vehicle not found" });
        }

        res.json({ msg: "Update successfully", data: updateVehicle });
    } catch (error) {
        console.error('Update vehicle Error:', error.message);
        res.status(400).json({ msg: "Update vehicle Error", error: error.message });
    }
};

export const DeleteVehicle = async (req, res) => {
    try {
        const deleteVehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!deleteVehicle) {
            return res.status(400).json({ msg: "Vehicle not found, deletion failed" });
        }

        res.json({ msg: "Vehicle deleted successfully" });
    } catch (error) {
        console.error('Vehicle deletion error', error);
        res.status(400).json({ msg: "Deletion failed", error: error.message });
    }
}


