import mongoose from "mongoose";

const TimeTableShema = new mongoose.Schema({
    EmployeeName: {
        type: String,
        required: true
    },
    Date: {
        type: Date, 
        required: true
    },
    Task: {
        type: String,
        required: true
    }
});

export default mongoose.model('TimeTable', TimeTableShema);