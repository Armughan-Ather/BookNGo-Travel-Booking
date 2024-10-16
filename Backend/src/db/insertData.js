import sequelize from '../config/database.js'; // Sequelize instance
import bcrypt from 'bcrypt';

const insertAdmins = async () => {
    try {
        const h1 = await bcrypt.hash('Kay224643', 10);
        const h2 = await bcrypt.hash('Kay224611', 10);
        const h3 = await bcrypt.hash('Kay224416', 10);

        const query = `
        INSERT INTO Admin (userName, name, password, lastLogin) 
        VALUES 
        (:userName1, :name1, :password1, NOW()),
        (:userName2, :name2, :password2, NOW()),
        (:userName3, :name3, :password3, NOW())
    `;

        await sequelize.query(query, {
            replacements: {
                userName1: 'msuhk',
                name1: 'Mohammad Shahmeer Ul Haq',
                password1: h1,
                userName2: 'roohan.alt',
                name2: 'Roohan Ahmed',
                password2: h2,
                userName3: 'armughann_',
                name3: 'Armughan Ather',
                password3: h3
            },
            type: sequelize.QueryTypes.INSERT
        });
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};









const insertAirlines = async () => {
    try {
        const query = `
        INSERT INTO Airline (name, rating, ratingCount)
        VALUES ${Array.from({ length: 5 }, (_, i) =>
            `('Airline${i + 1}', ${Math.floor(Math.random() * 5) + 1}, ${Math.floor(Math.random() * 500) + 1})`
        ).join(', ')}
    `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};










const insertHotels = async () => {
    try {
        const cities = Array.from({ length: 10 }, (_, i) => `City${i + 1}`);

        const query = `
        INSERT INTO Hotel (name, standard, deluxe, location, pricePerNightStandard, pricePerNightDeluxe, rating, ratingCount)
        VALUES ${cities.flatMap(city =>
            Array.from({ length: 10 }, (_, i) =>
                `('Hotel${city}_${i + 1}', ${Math.floor(Math.random() * 20) + 1}, ${Math.floor(Math.random() * 10) + 1}, '${city}', ${100 + i * 10}, ${150 + i * 15}, ${Math.floor(Math.random() * 5) + 1}, ${Math.floor(Math.random() * 300) + 1})`)
        ).join(', ')}
    `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};










const insertFlights = async () => {
    try {
        const cities = Array.from({ length: 10 }, (_, i) => `City${i + 1}`);
        const airlines = Array.from({ length: 5 }, (_, i) => i + 1);

        const query = `
        INSERT INTO Flight (airlineId, departure, destination, origin, price, status, numSeats)
        VALUES ${cities.flatMap(origin =>
            cities.filter(destination => destination !== origin)
                .flatMap(destination =>
                    airlines.flatMap(airline =>
                        Array.from({ length: 10 }, () =>
                            `(${airline}, NOW(), '${destination}', '${origin}', ${Math.floor(Math.random() * 500) + 100}, 'Scheduled', ${Math.floor(Math.random() * 150) + 50})`)
                    )
                )
        ).join(', ')}
    `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};










const insertFlightReservations = async () => {
    try {
        const query = `
        INSERT INTO FlightReservation (flightId, userId, bookingDate, status, seats)
        VALUES ${Array.from({ length: 500 }, (_, i) =>
            `(${i + 1}, ${Math.floor(i / 5) + 1}, NOW(), 'Booked', ${Math.floor(Math.random() * 5) + 1})`
        ).join(', ')}
    `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};










const insertHotelReservations = async () => {
    try {
        const query = `
        INSERT INTO HotelReservation (hotelId, userId, bookingDate, reservationDate, endDate, status, noOfDays, noOfRooms, type)
        VALUES ${Array.from({ length: 1000 }, (_, i) =>
            `(${Math.floor(i / 10) + 1}, ${Math.floor(i / 10) + 1}, NOW(), NOW(), NOW(), 'Booked', ${Math.floor(Math.random() * 10) + 1}, ${Math.floor(Math.random() * 5) + 1}, '${i % 2 === 0 ? 'Standard' : 'Deluxe'}')`
        ).join(', ')}
    `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};











const insertBundles = async () => {
    try {
        const totalFlights = 900;  // From insertFlights (10 cities * 9 destination cities * 10 flights each = 900 flights)
        const totalHotels = 100;   // From insertHotels (10 cities * 10 hotels each = 100 hotels)

        const query = `
        INSERT INTO Bundle (flightId, flightIdRet, hotelId, discount)
        VALUES ${Array.from({ length: 500 }, (_, i) => {
            const flightId = (i % totalFlights) + 1;               // Flight ID (1 to 900)
            const flightIdRet = ((i + 1) % totalFlights) + 1;       // Return Flight ID (next flight)
            const hotelId = (Math.floor(i / 5) % totalHotels) + 1;  // Hotel ID (1 to 100)
            const discount = Math.floor(Math.random() * 30) + 5;    // Random discount (5 to 35)

            return `(${flightId}, ${flightIdRet}, ${hotelId}, ${discount})`;
        }).join(', ')}
        `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
        console.log('Bundles inserted successfully.');
    } catch (error) {
        console.error('Error inserting bundles:', error);
    }
};












const insertUsers = async () => {
    try {
        // Hash the password for all users (same password for simplicity)
        const hashedPassword = await bcrypt.hash('Samepass1', 10);

        // Create the insert query with hashed passwords
        const query = `
            INSERT INTO User (userName, name, password, email, phone, bookings)
            VALUES ${Array.from({ length: 100 }, (_, i) =>
            `('user${i + 1}', 'User ${i + 1}', '${hashedPassword}', 'user${i + 1}@example.com', '1234567${i + 1}', 0)`
        ).join(', ')}
        `;

        await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
        console.log('Users inserted successfully');
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};










const insertAllData = async () => {
    try {
        await insertUsers();
        await insertAdmins();
        await insertAirlines();
        await insertHotels();
        await insertFlights();
        await insertFlightReservations();
        await insertHotelReservations();
        await insertBundles();
        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

insertAllData();