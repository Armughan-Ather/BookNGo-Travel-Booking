import sequelize from '../config/database.js'; // Sequelize instance
import { ApiResponse } from '../utils/ApiResponse'; // Assuming you have this

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`); // Convert to JS Date format compatible with SQL TIMESTAMP
};

export const searchFlights = async (req, res) => {
    try {
        const { origin, destination, numberOfSeats, fromDate, toDate, airlineName } = req.body;

        // 1. Validate inputs
        if (!origin || !destination || !numberOfSeats || !fromDate) {
            return res.status(400).json({ error: 'Origin, destination, number of seats, and fromDate are required.' });
        }

        // 2. Parse dates (convert from "dd/mm/yyyy" to SQL TIMESTAMP)
        const fromDateTimestamp = parseDate(fromDate);
        let toDateTimestamp = toDate ? parseDate(toDate) : null;

        // 3. Build the base query for flights
        let query = `
            SELECT * FROM Flight
            WHERE origin = :origin
              AND destination = :destination
              AND numSeats >= :numberOfSeats
              AND departure >= :fromDateTimestamp
        `;

        // 4. Add toDate condition if provided
        if (toDateTimestamp) {
            query += ` AND departure <= :toDateTimestamp`;
        }

        // 5. If airlineName is provided, search for that specific airline
        if (airlineName) {
            const airline = await Airline.findOne({ where: { name: airlineName } });
            if (!airline) {
                return res.status(404).json({ error: 'Airline not found.' });
            }
            query += ` AND airlineId = :airlineId`;
        }

        // 6. Execute the raw SQL query with replacements
        const [flights] = await sequelize.query(query, {
            replacements: {
                origin: origin,
                destination: destination,
                numberOfSeats: parseInt(numberOfSeats),
                fromDateTimestamp: fromDateTimestamp,
                toDateTimestamp: toDateTimestamp,
                airlineId: airlineName ? airline.id : undefined, // Add airlineId if airlineName is provided
            },
            type: sequelize.QueryTypes.SELECT
        });

        // 7. Check if any flights were found
        if (flights.length === 0) {
            return res.status(404).json({ error: 'No flights found matching the criteria.' });
        }

        // 8. Return the list of flights
        return res.status(200).json(new ApiResponse(200, flights, 'Flights found.'));
    } catch (error) {
        console.error('Error searching flights:', error);
        return res.status(500).json({ error: 'An error occurred while searching for flights.' });
    }
};