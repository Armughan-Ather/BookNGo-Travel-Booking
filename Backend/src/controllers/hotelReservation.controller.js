import sequelize from '../config/database.js'; // Sequelize instance
import { ApiResponse } from '../utils/ApiResponse.js'; // Assuming you have this

export const reserveHotelRoom = async (req, res) => {
    const { hotelId, userName, reservationDate, endDate, noOfRooms, type } = req.body;

    // Start a transaction to ensure data consistency
    const transaction = await sequelize.transaction();

    try {
        if (!hotelId || !userName || !reservationDate || !endDate || !noOfRooms || !type) {
            return res.status(400).json({ error: 'ReservationDate, endDate, room type, and number of rooms are required.' });
        }
        // Determine which room type to check and update (standard or deluxe)
        const roomTypeField = type === 'Standard' ? 'standard' : 'deluxe';

        // Check if enough rooms of the specified type are available
        const [hotel] = await sequelize.query(
            `SELECT ${roomTypeField} FROM Hotel WHERE id = ?`,
            {
                replacements: [hotelId],
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

        if (!hotel || hotel[roomTypeField] < noOfRooms) {
            return res.status(400).json({ error: 'Not enough rooms available' });
        }

        // Calculate number of days
        const [daysResult] = await sequelize.query(
            'SELECT DATEDIFF(?, ?) AS noOfDays',
            {
                replacements: [endDate, reservationDate],
                type: sequelize.QueryTypes.SELECT,
                transaction,
            }
        );
        const noOfDays = daysResult.noOfDays;

        // Insert reservation data into HotelReservation table
        const [result] = await sequelize.query(
            `INSERT INTO HotelReservation (hotelId, userId, reservationDate, endDate, noOfDays, noOfRooms, type)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements: [hotelId, userId, reservationDate, endDate, noOfDays, noOfRooms, type],
                type: sequelize.QueryTypes.INSERT,
                transaction,
            }
        );

        // Update the remaining number of rooms in the Hotel table for the specified room type
        await sequelize.query(
            `UPDATE Hotel SET ${roomTypeField} = ${roomTypeField} - ? WHERE id = ?`,
            {
                replacements: [noOfRooms, hotelId],
                type: sequelize.QueryTypes.UPDATE,
                transaction,
            }
        );

        // Commit the transaction after successful reservation
        await transaction.commit();
        return res.status(200).json(new ApiResponse(200, null, 'Hotel room reserved successfully'));
    } catch (error) {
        // Rollback the transaction in case of errors
        await transaction.rollback();
        console.log(error.message);
        res.status(500).json({ error: 'Error reserving hotel room' });
    }
};