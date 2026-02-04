import sequelize from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

// Utility to generate random numbers in a range
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const addPakistaniFlights = async () => {
    try {
        const pakistaniCities = [
            'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Multan', 
            'Peshawar', 'Quetta', 'Hyderabad', 'Rawalpindi', 'Gujranwala',
            'Sialkot', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana'
        ];

        const startDate = new Date('2025-3-31');
        const endDate = new Date('2025-12-31');
        let flightCount = 0;
        const targetFlights = 50; // Add 50 more Pakistani flights

        console.log('Adding Pakistani flights...');

        while (flightCount < targetFlights) {
            const origin = pakistaniCities[random(0, pakistaniCities.length - 1)];
            const destination = pakistaniCities[random(0, pakistaniCities.length - 1)];

            if (origin === destination) continue;

            // Use Pakistani airlines (IDs 1-5) more frequently
            const airline = random(1, 10); // Mix of Pakistani and international
            const departureDate = new Date(startDate.getTime() + random(0, endDate - startDate));
            
            // Pakistani domestic flights are generally cheaper
            const price = random(50, 200);
            const numSeats = random(100, 180); // Typical domestic aircraft capacity
            const status = 'Scheduled';

            const query = `
                INSERT INTO Flight (airlineId, origin, destination, departure, price, status, numSeats)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            try {
                await sequelize.query(query, {
                    replacements: [airline, origin, destination, departureDate.toISOString().slice(0, 19).replace('T', ' '), price, status, numSeats],
                    type: sequelize.QueryTypes.INSERT
                });
                console.log(`✅ Added flight: ${origin} → ${destination} (${price} PKR)`);
                flightCount++;
            } catch (error) {
                console.error(`❌ Error adding flight: ${error.message}`);
            }
        }

        console.log(`🎉 Successfully added ${flightCount} Pakistani flights!`);
    } catch (error) {
        console.error('Error adding Pakistani flights:', error);
    }
};

const addPakistaniHotels = async () => {
    try {
        const pakistaniCities = [
            'Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Multan', 
            'Peshawar', 'Quetta', 'Hyderabad', 'Rawalpindi', 'Gujranwala'
        ];

        const pakistaniHotelNames = [
            'Pearl Continental', 'Serena Hotel', 'Marriott', 'Hilton', 'Avari',
            'Movenpick', 'Best Western', 'Ramada', 'Holiday Inn', 'Hotel One',
            'Faletti\'s Hotel', 'Ambassador Hotel', 'Carlton Hotel', 'Regent Plaza',
            'Royal Palace', 'Grand Hotel', 'City Hotel', 'Park Hotel'
        ];

        console.log('Adding Pakistani hotels...');

        for (const city of pakistaniCities) {
            // Add 2-3 hotels per city
            const hotelsPerCity = random(2, 3);
            
            for (let i = 0; i < hotelsPerCity; i++) {
                const hotelBaseName = pakistaniHotelNames[random(0, pakistaniHotelNames.length - 1)];
                const uniqueName = `${hotelBaseName} ${city}`.replace(/'/g, "''");

                // Check if hotel already exists
                const [existingHotel] = await sequelize.query(
                    `SELECT COUNT(*) AS count FROM Hotel WHERE name = ?`,
                    {
                        replacements: [uniqueName],
                        type: sequelize.QueryTypes.SELECT
                    }
                );

                if (existingHotel.count > 0) {
                    console.log(`⏭️  Hotel ${uniqueName} already exists`);
                    continue;
                }

                const standardRooms = random(20, 80);
                const deluxeRooms = random(10, 40);
                // Pakistani hotel prices (in PKR equivalent)
                const priceStandard = random(80, 250);
                const priceDeluxe = random(150, 400);
                const rating = (Math.random() * 4 + 1).toFixed(1);
                const ratingCount = random(50, 500);

                const query = `
                    INSERT INTO Hotel (name, standard, deluxe, location, pricePerNightStandard, pricePerNightDeluxe, rating, ratingCount)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;

                try {
                    await sequelize.query(query, {
                        replacements: [uniqueName, standardRooms, deluxeRooms, city, priceStandard, priceDeluxe, rating, ratingCount],
                        type: sequelize.QueryTypes.INSERT
                    });
                    console.log(`✅ Added hotel: ${uniqueName} (${priceStandard}-${priceDeluxe} PKR)`);
                } catch (error) {
                    console.error(`❌ Error adding hotel ${uniqueName}:`, error.message);
                }
            }
        }

        console.log('🎉 Successfully added Pakistani hotels!');
    } catch (error) {
        console.error('Error adding Pakistani hotels:', error);
    }
};

const runPakistaniDataInsertion = async () => {
    try {
        console.log('🇵🇰 Starting Pakistani data insertion...');
        await addPakistaniFlights();
        await addPakistaniHotels();
        console.log('🎉 Pakistani data insertion completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during Pakistani data insertion:', error);
        process.exit(1);
    }
};

runPakistaniDataInsertion();