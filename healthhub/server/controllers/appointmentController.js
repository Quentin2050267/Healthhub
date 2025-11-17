const axios = require('axios');
const { getDb } = require('../db'); // Import database connection module

/**
 * makeAppointment function
 * Handles the creation of a new appointment.
 * Checks for duplicate appointments and inserts a new appointment if none exists.
 * @param {object} req - The request object containing appointment details.
 * @param {object} res - The response object to send the result.
 */
exports.makeAppointment = async (req, res) => {
    const { name, email, phone, hospital, department, date, timeslot } = req.body;
    try {
        const db = getDb();
        // Check for duplicate appointments
        const existingAppointment = await db.collection('appointment').findOne({ email, date, timeslot });
        if (existingAppointment) {
            return res.json({ error: 'Appointment already exists', flag: false });
        }
        const appointment = await db.collection('appointment').insertOne({
            name, email, phone, hospital, department, date, timeslot, approved: false
        });
        res.json({ message: 'Appointment made successfully', flag: true, appointment: appointment });
    } catch (error) {
        console.error('Error making appointment:', error);
        res.status(500).json({ error: 'Failed to make appointment', flag: false });
    }
}