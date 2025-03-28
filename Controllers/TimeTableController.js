import TimeTable from '../models/TimeTable.js';
import { StatusCodes } from 'http-status-codes';

// Get all timetable entries
export const getAllTimeTables = async (req, res) => {
    try {
        const timeTables = await TimeTable.find();
        res.status(StatusCodes.OK).json({ timeTables });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Create a new timetable entry
export const createTimeTable = async (req, res) => {
    try {
        const { EmployeeName, Date, Task } = req.body;
        const newTimeTable = new TimeTable({
            EmployeeName,
            Date,
            Task,
        });

        const timeTable = await newTimeTable.save();
        res.status(StatusCodes.CREATED).json({ timeTable });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Get a single timetable entry by ID
export const getSingleTimeTable = async (req, res) => {
    try {
        const timeTable = await TimeTable.findById(req.params.id);
        if (!timeTable) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'TimeTable not found' });
        }
        res.status(StatusCodes.OK).json({ timeTable });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Update a timetable entry by ID
export const updateTimeTable = async (req, res) => {
    try {
        const updatedTimeTable = await TimeTable.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTimeTable) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'TimeTable not found' });
        }
        res.status(StatusCodes.OK).json({ msg: 'TimeTable Updated', timeTable: updatedTimeTable });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

// Delete a timetable entry by ID
export const deleteTimeTable = async (req, res) => {
    try {
        const deletedTimeTable = await TimeTable.findByIdAndDelete(req.params.id);
        if (!deletedTimeTable) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'TimeTable not found' });
        }
        res.status(StatusCodes.OK).json({ msg: 'TimeTable deleted', timeTable: deletedTimeTable });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
