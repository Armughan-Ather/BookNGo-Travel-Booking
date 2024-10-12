import sequelize from '../config/database.js'; // Sequelize instance
import { ApiResponse } from '../utils/ApiResponse'; // Assuming you have this

export const allAirlines = async (req, res) => {
    try {
        const query = `
            SELECT name FROM Airline
        `;

        // 3. Execute the raw SQL query with replacements
        const [airlines] = await sequelize.query(query, {
            replacements: {
            },
            type: sequelize.QueryTypes.SELECT
        });

        // 4. Check if any airlines were found
        if (airlines.length === 0) {
            return res.status(404).json({ error: 'Unable to fetch airline names.' });
        }

        // 5. Return the list of airlines
        return res.status(200).json(new ApiResponse(200, airlines, 'Airlines found.'));
    } catch (error) {
        console.error('Error fetching airline names:', error);
        return res.status(500).json({ error: 'An error occurred while fetching for airline names.' });
    }
};