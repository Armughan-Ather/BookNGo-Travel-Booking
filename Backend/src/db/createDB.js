import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    connection.query('CREATE DATABASE IF NOT EXISTS BookNGo', (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created or already exists');

        connection.query('USE BookNGo', (err) => {
            if (err) {
                console.error('Error using database:', err);
                return;
            }

            const createTableUser = `
                CREATE TABLE IF NOT EXISTS User (
                id VARCHAR(20) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                bookings INT DEFAULT 0
            )
            `;
            const createTableAdmin = `
                CREATE TABLE IF NOT EXISTS Admin (
                id VARCHAR(20) PRIMARY KEY,
                password VARCHAR(100) NOT NULL,
                lastLogin TIMESTAMP
            )
            `;
            // UPDATE Admin SET last_login = NOW() WHERE id = 1;
            const createTableFlight = `
                CREATE TABLE IF NOT EXISTS Flight (
                id INT AUTO_INCREMENT PRIMARY KEY,
                airlineName VARCHAR(100) NOT NULL,
                departure TIMESTAMP NOT NULL,
                destination VARCHAR(100) NOT NULL,
                origin VARCHAR(100) NOT NULL,
                price INT NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'Scheduled',
                numSeats INT NOT NULL,
                FOREIGN KEY (airlineName) REFERENCES Airline(name)
            )
            `;
            const createTableAirline = `
                CREATE TABLE IF NOT EXISTS Airline (
                name VARCHAR(100) PRIMARY KEY,
                rating INT NOT NULL,
                ratingCount INT NOT NULL DEFAULT 0
            )
            `;
            const createTableFlightReservation = `
                CREATE TABLE IF NOT EXISTS FlightReservation (
                id INT AUTO_INCREMENT PRIMARY KEY,
                airlineName VARCHAR(100) NOT NULL,
                userId VARCHAR(20),
                bookingDate DATE DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) NOT NULL DEFAULT 'Scheduled',
                seats INT NOT NULL,
                FOREIGN KEY (airlineName) REFERENCES Airline(name),
                FOREIGN KEY (userId) REFERENCES User(id)
            )
            `;
            const createTableHotel = `
                CREATE TABLE IF NOT EXISTS Hotel (
                name VARCHAR(100) PRIMARY KEY,
                standard INT NOT NULL,
                deluxe INT NOT NULL,
                location VARCHAR(50) NOT NULL,
                pricePerNightStandard INT NOT NULL,
                pricePerNightDeluxe INT NOT NULL,
                rating INT NOT NULL,
                ratingCount INT NOT NULL DEFAULT 0
            )
            `;
            const createTableHotelReservation = `
                CREATE TABLE IF NOT EXISTS HotelReservation (
                id INT AUTO_INCREMENT PRIMARY KEY,
                hotelName VARCHAR(100) NOT NULL,
                userId VARCHAR(20),
                bookingDate DATE DEFAULT CURRENT_TIMESTAMP,
                reservationDate DATE DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) NOT NULL DEFAULT 'Pending',
                noOfDays INT NOT NULL,
                count INT NOT NULL DEFAULT 1,
                type ENUM('Standard', 'Deluxe') NOT NULL DEFAULT 'Standard',
                FOREIGN KEY (hotelName) REFERENCES Hotel(name),
                FOREIGN KEY (userId) REFERENCES User(id)
            )
            `;
            const createTableBundle = `
                CREATE TABLE IF NOT EXISTS Bundle (
                flightId INT NOT NULL,
                hotelName VARCHAR(100) NOT NULL,
                discount INT NOT NULL,
                PRIMARY KEY (flightId, hotelName),
                FOREIGN KEY (flightId) REFERENCES Flight(id),
                FOREIGN KEY (hotelName) REFERENCES Hotel(name)
            )
            `;

            const createTableQueries = [
                {
                    query: createTableUser,
                    tableName: 'User'
                },
                {
                    query: createTableAdmin,
                    tableName: 'Admin'
                },
                {
                    query: createTableAirline,
                    tableName: 'Airline'
                },
                {
                    query: createTableFlight,
                    tableName: 'Flight'
                },
                {
                    query: createTableFlightReservation,
                    tableName: 'FlightReservation'
                },
                {
                    query: createTableHotel,
                    tableName: 'Hotel'
                },
                {
                    query: createTableHotelReservation,
                    tableName: 'HotelReservation'
                },
                {
                    query: createTableBundle,
                    tableName: 'Bundle'
                }
            ]
            let tableIndex = 0;

            function createNextTable() {
                if (tableIndex < createTableQueries.length) {
                    const { query, tableName } = createTableQueries[tableIndex];
                    console.log(`Creating table: ${tableName}`);

                    connection.query(query, (err, result) => {
                        if (err) {
                            console.error(`Error creating table ${tableName}:`, err);
                            return;
                        }
                        console.log(`Table ${tableName} created or already exists`);

                        tableIndex++;
                        createNextTable(); // Recursively call to create the next table
                    });
                } else {
                    connection.end(err => {
                        if (err) {
                            console.error('Error closing the connection:', err);
                        } else {
                            console.log('Connection closed.');
                        }
                    });
                }
            }

            // Start the table creation process
            createNextTable();

            // connection.query(createTableQuery, (err, result) => {
            //     if (err) {
            //         console.error('Error creating table:', err);
            //         return;
            //     }
            //     console.log('Table created or already exists');

            //     connection.end(err => {
            //         if (err) {
            //             console.error('Error closing the connection:', err);
            //         } else {
            //             console.log('Connection closed.');
            //         }
            //     });
            // });
        });
    });
});