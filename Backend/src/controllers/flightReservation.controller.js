import sequelize from '../config/database.js'; // Sequelize instance
import { ApiResponse } from '../utils/ApiResponse.js'; // Assuming you have this

export const reserveFlight = async (req, res) => {
    const { flightId, userName, seats } = req.body;

    // Start a transaction to ensure data consistency
    const transaction = await sequelize.transaction();

    try {
        if (!flightId || !userName || !seats) {
            return res.status(400).json({ error: 'Number of seats is required.' });
        }

        // Check if enough rooms of the specified type are available
        const [flight] = await sequelize.query(
            `SELECT numSeats FROM Flight WHERE id = ?`,
            {
                replacements: [flightId],
                type: sequelize.QueryTypes.SELECT,
                transaction,
            }
        );

        const [user] = await sequelize.query(
            `SELECT id FROM user WHERE userName = ?`,
            {
                replacements: [userName],
                type: sequelize.QueryTypes.SELECT,
                transaction,
            }
        );

        if (!user) {
            return res.status(400).json({ error: 'User Not Found' });
        }

        const userId = user.id;

        if (!flight || flight.numSeats < seats) {
            return res.status(400).json({ error: 'Not enough seats available' });
        }

        // Insert reservation data into HotelReservation table
        const [result] = await sequelize.query(
            `INSERT INTO FlightReservation (flightId, userId, seats)
             VALUES (?, ?, ?)`,
            {
                replacements: [flightId, userId, seats],
                type: sequelize.QueryTypes.INSERT,
                transaction,
            }
        );

        // Update the remaining number of rooms in the Hotel table for the specified room type
        await sequelize.query(
            `UPDATE flight SET numSeats = numSeats - ? WHERE id = ?`,
            {
                replacements: [seats, flightId],
                type: sequelize.QueryTypes.UPDATE,
                transaction,
            }
        );

        // Commit the transaction after successful reservation
        await transaction.commit();
        return res.status(200).json(new ApiResponse(200, null, 'Seat(s) reserved successfully'));
    } catch (error) {
        // Rollback the transaction in case of errors
        await transaction.rollback();
        console.log(error.message);
        res.status(500).json({ error: 'Error reserving seat(s)' });
    }
};