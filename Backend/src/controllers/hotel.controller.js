import sequelize from '../config/database.js'; // Sequelize instance
import { ApiResponse } from '../utils/ApiResponse'; // Assuming you have this

export const searchHotels = async (req, res) => {
    try {
        const { hotelNameOrCity, roomType, numberOfRooms } = req.body;

        // 1. Validate inputs
        if (!hotelNameOrCity || !roomType || !numberOfRooms) {
            return res.status(400).json({ error: 'Hotel name/City, room type, and number of rooms are required.' });
        }

        // 2. Build the base query to find hotels based on hotel name or city
        const query = `
            SELECT * FROM Hotel
            WHERE (name = :hotelNameOrCity OR location = :hotelNameOrCity)
              AND ${roomType} >= :numberOfRooms
        `;

        // 3. Execute the raw SQL query with replacements
        const [hotels] = await sequelize.query(query, {
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
        const [hotels] = await sequelize.query(query, {
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