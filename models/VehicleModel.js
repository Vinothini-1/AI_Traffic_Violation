import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
    VehicleNumber: {
        type: String,
        required: true,
    },
    VehicleName: {
        type: String,
        required: true,
    },
    ChassiNumber: {
        type: String,
        required: true,
    },
    VehicleCategory: {
        type: String,
        required: true,
    },
    AddDate: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
        default: 'available',
    },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle; 
