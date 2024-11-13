import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js'; // Sequelize instance
import { TIME } from "sequelize";

export const updateFlightReservationStatuses = async (req, res) => {
    try {
        const currentDateTime = new Date().toISOString(); // Get the current date and time in 'yyyy-mm-ddTHH:MM:SS' format

        // Step 1: Update "Booked" to "Availed" in FlightReservation where the flight's departure is past the current date and time
        const updateToAvailedReservationQuery = `
            UPDATE FlightReservation AS fr
            JOIN Flight AS f ON fr.flightId = f.id
            SET fr.status = 'Availed'
            WHERE fr.status = 'Booked' AND f.departure <= :currentDateTime
        `;

        await sequelize.query(updateToAvailedReservationQuery, {
            replacements: { currentDateTime },
            type: sequelize.QueryTypes.UPDATE,
        });

        // Step 2: Update "Scheduled" to "Fulfilled" in Flight where the departure is past the current date and time
        const updateToFulfilledFlightQuery = `
            UPDATE Flight
            SET status = 'Fulfilled'
            WHERE status = 'Scheduled' AND departure <= :currentDateTime
        `;

        await sequelize.query(updateToFulfilledFlightQuery, {
            replacements: { currentDateTime },
            type: sequelize.QueryTypes.UPDATE,
        });

        return res.status(200).json({ message: 'Flight reservation statuses updated successfully.' });
    } catch (error) {
        console.error('Error updating flight and reservation statuses:', error);
        return res.status(500).json({ error: 'An error occurred while updating flight and reservation statuses.' });
    }
};


export const updateHotelReservationStatuses = async (req, res) => {
    try {
        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'yyyy-mm-dd' format

        // Step 1: Update "Booked" to "Availing" for reservations with reservationDate <= currentDate and status "Booked"
        const updateToAvailingQuery = `
            UPDATE HotelReservation
            SET status = 'Availing'
            WHERE status = 'Booked' AND reservationDate <= :currentDate
        `;

        await sequelize.query(updateToAvailingQuery, {
            replacements: { currentDate },
            type: sequelize.QueryTypes.UPDATE,
        });

        // Step 2: Update "Availing" to "Availed" for reservations with endDate < currentDate and status "Availing"
        const updateToAvailedQuery = `
            UPDATE HotelReservation
            SET status = 'Availed'
            WHERE status = 'Availing' AND endDate < :currentDate
        `;

        await sequelize.query(updateToAvailedQuery, {
            replacements: { currentDate },
            type: sequelize.QueryTypes.UPDATE,
        });

        return res.status(200).json({ message: 'Hotel reservation statuses updated successfully.' });
    } catch (error) {
        console.error('Error updating reservation statuses:', error);
        return res.status(500).json({ error: 'An error occurred while updating reservation statuses.' });
    }
};















export const loginAdmin = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { userName, password } = req.body;

        // 1. Basic validations
        if (!userName || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        // 2. Build the SQL query to find the admin by userName
        const query = `
            SELECT * FROM Admin WHERE userName = :userName
        `;

        // 3. Execute the raw SQL query
        const [admins] = await sequelize.query(query, {
            replacements: {
                userName: userName, // Exact match for username
            },
            type: sequelize.QueryTypes.SELECT
        });

        // 4. Check if admin exists
        if (admins) { // Check if the result is an array with at least one entry

            // 5. Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, admins.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password.' });
            }

            // 7. Return success response with admin data
            const loggedInAdmin = {
                id: admins.id,
                userName: admins.userName,
                name: admins.name,
                lastLogin: admins.lastLogin // Last login before update
            };

            // 6. Update the last login timestamp
            const updateQuery = `
                UPDATE Admin SET lastLogin = NOW() WHERE id = :id
            `;
            await sequelize.query(updateQuery, {
                replacements: { id: admins.id },
                type: sequelize.QueryTypes.UPDATE
            });

            return res.status(200).json(new ApiResponse(200, loggedInAdmin, 'Admin logged in successfully.'));
        } else {
            return res.status(401).json({ error: 'Invalid username.' });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: 'Something went wrong while logging in the admin.' });
    }
};