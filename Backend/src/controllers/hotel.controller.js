import sequelize from '../config/database.js'; // Sequelize instance
import { ApiResponse } from '../utils/ApiResponse.js'; // Assuming you have this

export const searchAvailableHotels = async (req, res) => {
    try {
        const { hotelNameOrCity, roomType, numberOfRooms, reservationDate, endDate } = req.body;

        // 1. Validate inputs
        if (!hotelNameOrCity || !roomType || !numberOfRooms || !reservationDate || !endDate) {
            return res.status(400).json({ error: 'Hotel name/City, room type, number of rooms, reservation date, and end date are required.' });
        }

        // Convert reservationDate and endDate to Date objects
        const reservationStartDate = new Date(reservationDate);
        const reservationEndDate = new Date(endDate);

        // Check if the dates are valid
        if (isNaN(reservationStartDate.getTime()) || isNaN(reservationEndDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format.' });
        }

        // 2. Build the query to find hotels based on hotel name or city
        const query1 = `
            SELECT * FROM Hotel
            WHERE (name = :hotelNameOrCity OR location = :hotelNameOrCity)
        `;

        // Execute the raw SQL query to get hotels by name or city
        const hotels1 = await sequelize.query(query1, {
            replacements: {
                hotelNameOrCity: hotelNameOrCity, // Exact match
            },
            type: sequelize.QueryTypes.SELECT
        });

        // Check if any hotels were found
        if (hotels1.length === 0) {
            return res.status(404).json({ error: 'We do not have any hotels in this city.' });
        }

        // 3. Build the query to check availability of rooms for the selected date range
        const query = `
            SELECT h.*, 
                   (h.${roomType} - COALESCE(SUM(CASE 
                        WHEN (hr.reservationDate <= :endDate AND hr.endDate >= :reservationDate AND hr.type = :roomType) 
                        THEN hr.noOfRooms ELSE 0 END), 0)) AS availableRooms
            FROM Hotel h
            LEFT JOIN HotelReservation hr ON hr.hotelId = h.id
            WHERE (h.name = :hotelNameOrCity OR h.location = :hotelNameOrCity)
              AND h.${roomType} >= :numberOfRooms
            GROUP BY h.id
            HAVING availableRooms >= :numberOfRooms
        `;

        // Execute the query to get available hotels
        const hotels = await sequelize.query(query, {
            replacements: {
                hotelNameOrCity: hotelNameOrCity, // Exact match
                numberOfRooms: parseInt(numberOfRooms) || 1,
                roomType: roomType, // Add roomType to the query
                reservationDate: reservationStartDate.toISOString().split('T')[0], // Date format 'yyyy-mm-dd'
                endDate: reservationEndDate.toISOString().split('T')[0], // Date format 'yyyy-mm-dd'
            },
            type: sequelize.QueryTypes.SELECT
        });

        // Check if any hotels were found
        if (hotels.length === 0) {
            return res.status(404).json({ error: 'We are full for the selected dates.' });
        }

        // 4. Return the list of available hotels
        return res.status(200).json(new ApiResponse(200, hotels, 'Hotels found.'));
    } catch (error) {
        console.error('Error searching hotels:', error);
        return res.status(500).json({ error: 'An error occurred while searching for hotels.' });
    }
};


export const searchHotels = async (req, res) => {
    try {
        const { hotelNameOrCity, roomType, numberOfRooms } = req.body;

        // 1. Validate inputs
        if (!hotelNameOrCity || !roomType || !numberOfRooms) {
            return res.status(400).json({ error: 'Hotel name/City, room type, and number of rooms are required.' });
        }

        const query1 = `
            SELECT * FROM Hotel
            WHERE (name = :hotelNameOrCity OR location = :hotelNameOrCity)
        `;

        // 3. Execute the raw SQL query with replacements
        const hotels1 = await sequelize.query(query1, {
            replacements: {
                hotelNameOrCity: hotelNameOrCity, // Exact match
            },
            type: sequelize.QueryTypes.SELECT
        });

        // 4. Check if any hotels were found
        if (hotels1.length === 0) {
            return res.status(404).json({ error: 'We do not have any hotels in this city.' });
        }

        // 2. Build the base query to find hotels based on hotel name or city
        const query = `
            SELECT * FROM Hotel
            WHERE (name = :hotelNameOrCity OR location = :hotelNameOrCity)
              AND ${roomType} >= :numberOfRooms
        `;

        // 3. Execute the raw SQL query with replacements
        const hotels = await sequelize.query(query, {
            replacements: {
                hotelNameOrCity: hotelNameOrCity, // Exact match
                numberOfRooms: parseInt(numberOfRooms) || 1,
            },
            type: sequelize.QueryTypes.SELECT
        });

        // 4. Check if any hotels were found
        if (hotels.length === 0) {
            return res.status(404).json({ error: 'We are full.' });
        }

        // 5. Return the list of hotels
        return res.status(200).json(new ApiResponse(200, hotels, 'Hotels found.'));
    } catch (error) {
        console.error('Error searching hotels:', error);
        return res.status(500).json({ error: 'An error occurred while searching for hotels.' });
    }
};

export const allHotels = async (req, res) => {
    try {
        const query = `
            SELECT name FROM Hotel
        `;

        // 3. Execute the raw SQL query with replacements
        const hotels = await sequelize.query(query, {
            replacements: {
            },
            type: sequelize.QueryTypes.SELECT
        });

        // 4. Check if any hotels were found
        if (hotels.length === 0) {
            return res.status(404).json({ error: 'Unable to fetch hotel names.' });
        }

        // 5. Return the list of hotels
        return res.status(200).json(new ApiResponse(200, hotels, 'Hotels found.'));
    } catch (error) {
        console.error('Error fetching hotel names:', error);
        return res.status(500).json({ error: 'An error occurred while fetching for hotel names.' });
    }
};