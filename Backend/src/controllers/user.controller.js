import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt';
import connection from '../db/connection.js';
import jwt from 'jsonwebtoken';
import sequelize from '../config/database.js';

export const getUserHotelReservationHistory = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        const hotelHistoryQuery = `
            SELECT h.name AS hotelName, h.location AS hotelLocation, hr.type, hr.noOfRooms, hr.bill, hr.id
            FROM HotelReservation hr
            JOIN Hotel h ON hr.hotelId = h.id
            JOIN User u ON hr.userId = u.id
            WHERE u.username = :username
            ORDER BY hr.reservationDate DESC
        `;

        const hotelReservations = await sequelize.query(hotelHistoryQuery, {
            replacements: { username },
            type: sequelize.QueryTypes.SELECT,
        });

        return res.status(200).json({ hotelReservations });
    } catch (error) {
        console.error('Error fetching hotel reservation history:', error);
        return res.status(500).json({ error: 'An error occurred while fetching hotel reservation history.' });
    }
};

export const getUserFlightReservationHistory = async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        const flightHistoryQuery = `
            SELECT fr.bill, fr.seats, f.origin, f.destination, f.departure, a.name, fr.id
            FROM FlightReservation fr
            JOIN Flight f ON fr.flightId = f.id
            JOIN User u ON fr.userId = u.id
            JOIN Airline a ON a.id = f.airlineId
            WHERE u.username = :username
            ORDER BY f.departure DESC
        `;

        const flightReservations = await sequelize.query(flightHistoryQuery, {
            replacements: { username },
            type: sequelize.QueryTypes.SELECT,
        });

        return res.status(200).json({ flightReservations });
    } catch (error) {
        console.error('Error fetching flight reservation history:', error);
        return res.status(500).json({ error: 'An error occurred while fetching flight reservation history.' });
    }
};


const registerUser = (req, res) => {
    console.log('Request Body:', req.body);
    const { userName, password, name, email, phone, cnicOrPassport } = req.body;

    console.log(userName, password, name, email, phone, cnicOrPassport);

    // 1. Basic validations
    if (!userName || !password || !name || !email || !phone || !cnicOrPassport) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // 3. Validate phone number
    const phoneRegex = /^[0-9]{10,20}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Invalid phone number format. Must be 10-20 digits.' });
    }

    // 4. Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 number.' });
    }

    // 5. Hash the password using bcrypt (with a callback)
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Failed to hash password.' });
        }

        // 6. Check if the username or email already exists
        connection.query(
            'SELECT * FROM User WHERE userName = ? OR email = ?',
            [userName, email],
            (err, rows) => {
                if (err) {
                    console.error('Error checking user existence:', err);
                    return res.status(500).json({ error: 'Database error.' });
                }

                if (rows.length > 0) {
                    return res.status(409).json({ error: 'Username or email already taken.' });
                }

                // 7. Insert new user into the database
                connection.query(
                    'INSERT INTO User (userName, name, password, email, phone, cnicOrPassport) VALUES (?, ?, ?, ?, ?, ?)',
                    [userName, name, hashedPassword, email, phone, cnicOrPassport],
                    (err, result) => {
                        if (err) {
                            console.error('Error inserting user:', err);
                            return res.status(500).json({ error: 'Failed to register user.' });
                        }

                        const createdUser = {
                            id: result.insertId,
                            userName,
                            name,
                            email,
                            phone,
                            cnicOrPassport
                        };

                        // 8. Return success response
                        return res.status(201).json(
                            new ApiResponse(200, createdUser, 'User registered successfully.')
                        );
                    }
                );
            }
        );
    });
};

export { registerUser };










// const registerUser = async (req, res) => {

//     try {
//         console.log('Request Body:', req.body);
//         const { userName, password, name, email, phone } = req.body;

//         console.log(userName, password, name, email, phone);

//         // 1. Basic validations
//         if (!userName || !password || !name || !email || !phone) {
//             //throw new ApiError(400, 'All fields are required.');
//             return res.status(400).json({ error: 'All fields are required.' });
//         }

//         // 2. Validate email format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             //throw new ApiError(400, 'Invalid email format.');
//             return res.status(400).json({ error: 'Invalid email format.' });
//         }

//         // 3. Validate phone number
//         const phoneRegex = /^[0-9]{10,20}$/;
//         if (!phoneRegex.test(phone)) {
//             //throw new ApiError(400, 'Invalid phone number format. Must be 10-20 digits.');
//             return res.status(400).json({ error: 'Invalid phone number format. Must be 10-20 digits.' });
//         }

//         // 4. Validate password strength
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
//         if (!passwordRegex.test(password)) {
//             return res.status(400).json({ error: 'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 number.' });
//         }

//         try {
//             // 5. Hash the password
//             const hashedPassword = await bcrypt.hash(password, 10);

//             // 6. Check if the username or email already exists
//             const [rows] = await connection.query(
//                 'SELECT * FROM User WHERE userName = ? OR email = ?',
//                 [userName, email]
//             );

//             if (rows.length > 0) {
//                 return res.status(409).json({ error: 'Username or email already taken.' });
//             }

//             // 7. Insert new user into the database
//             const [result] = await connection.query(
//                 `INSERT INTO User (userName, name, password, email, phone) VALUES (?, ?, ?, ?, ?)`,
//                 [userName, name, hashedPassword, email, phone]
//             );

//             const createdUser = {
//                 id: result.insertId,
//                 userName,
//                 name,
//                 email,
//                 phone
//             };

//             // 8. Return success response
//             return res.status(201).json(
//                 new ApiResponse(200, createdUser, 'User registered successfully.')
//             );
//         } catch (error) {
//             console.error('Error during user registration:', error);
//             return res.status(500).json({ error: error.message });
//             //throw new ApiError(500, 'Something went wrong while registering the user.');
//         }
//     } catch (error) {
//         console.error('Some User Error: ', error);
//         return res.status(400).json({ error: error.message });
//     }
// };

const loginUser = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { userNameOrEmail, password } = req.body;

        // 1. Basic validations
        if (!userNameOrEmail || !password) {
            return res.status(400).json({ error: 'Username/Email and password are required.' });
        }

        // 2. Fetch user from the database using a parameterized query
        connection.query(
            'SELECT * FROM User WHERE userName = ? OR email = ?',
            [userNameOrEmail, userNameOrEmail],
            async (error, rows) => {
                if (error) {
                    console.error('Error during user login:', error);
                    return res.status(500).json({ error: 'Something went wrong while logging in the user.' });
                }

                // 3. Check if user exists
                if (rows.length > 0) {
                    const user = rows[0];

                    // 4. Compare the provided password with the hashed password
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return res.status(401).json({ error: 'Invalid password.' });
                    }

                    // 5. Create a token using the user ID
                    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: process.env.ACCESS_TOKEN_EXPIRY  // Token expires in 1 hour
                    });

                    // 6. Return success response with token
                    const loggedInUser = {
                        id: user.id,
                        userName: user.userName,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        cnicOrPassport: user.cnicOrPassport,
                        token  // Include the token in the response
                    };

                    return res.status(200).json(
                        new ApiResponse(200, loggedInUser, 'User logged in successfully.')
                    );
                } else {
                    return res.status(401).json({ error: 'Invalid username/email.' });
                }
            }
        );

    } catch (error) {
        console.error('Some Login Error: ', error);
        return res.status(400).json({ error: error.message });
    }
};

export { loginUser };


// FINAL WITHOUT TOKEN
// const loginUser = async (req, res) => {

//     try {
//         console.log('Request Body:', req.body);
//         const { userNameOrEmail, password } = req.body;

//         // 1. Basic validations
//         if (!userNameOrEmail || !password) {
//             return res.status(400).json({ error: 'Username/Email and password are required.' });
//         }

//         // 2. Fetch user from the database using a parameterized query
//         connection.query(
//             'SELECT * FROM User WHERE userName = ? OR email = ?',
//             [userNameOrEmail, userNameOrEmail],
//             async (error, rows) => {
//                 if (error) {
//                     console.error('Error during user login:', error);
//                     return res.status(500).json({ error: 'Something went wrong while logging in the user.' });
//                 }

//                 // 3. Check if user exists
//                 if (rows.length > 0) {
//                     console.log("hi");
//                     const user = rows[0];
//                     console.log(user);

//                     // 4. Compare the provided password with the hashed password
//                     const passwordMatch = await bcrypt.compare(password, user.password);
//                     if (!passwordMatch) {
//                         return res.status(401).json({ error: 'Invalid password.' });
//                     }

//                     // 5. Return success response
//                     const loggedInUser = {
//                         id: user.id,
//                         userName: user.userName,
//                         name: user.name,
//                         email: user.email,
//                         phone: user.phone,
//                         cnicOrPassport: user.cnicOrPassport
//                     };

//                     return res.status(200).json(
//                         new ApiResponse(200, loggedInUser, 'User logged in successfully.')
//                     );
//                 } else {
//                     return res.status(401).json({ error: 'Invalid username/email.' });
//                 }
//             }
//         );

//     } catch (error) {
//         console.error('Some Login Error: ', error);
//         return res.status(400).json({ error: error.message });
//     }
// };

// export { loginUser };









// const loginUser = async (req, res) => {

//     try {
//         console.log('Request Body:', req.body);
//         const { userNameOrEmail, password } = req.body;

//         // 1. Basic validations
//         if (!userNameOrEmail || !password) {
//             return res.status(400).json({ error: 'Username/Email and password are required.' });
//         }



//         // 2. Determine if input is email or username
//         // const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userNameOrEmail);
//         // let query = 'SELECT * FROM User WHERE userName = ?';
//         // let queryParam = userNameOrEmail;

//         // if (isEmail) {
//         //     query = 'SELECT * FROM User WHERE email = ?';
//         // }

//         // 3. Fetch user from the database
//         try {
//             const rows = await connection.query(
//                 'SELECT * FROM User WHERE userName = ? OR email = ?',
//                 [userNameOrEmail, userNameOrEmail]
//             );
//             console.log(rows.length);
//             // const rows = await connection.query(query, [queryParam]);
//             if (rows) {
//                 console.log("hi");
//                 const user = rows[0];
//                 console.log(user);
//                 // 4. Compare the provided password with the hashed password
//                 const passwordMatch = await bcrypt.compare(password, user.password);
//                 //console.log("hello");

//                 if (!passwordMatch) {
//                     return res.status(401).json({ error: 'Invalid password.' });
//                 }

//                 // 5. Return success response
//                 const loggedInUser = {
//                     id: user.id,
//                     userName: user.userName,
//                     name: user.name,
//                     email: user.email,
//                     phone: user.phone
//                 };

//                 return res.status(200).json(
//                     new ApiResponse(200, loggedInUser, 'User logged in successfully.')
//                 );

//             }
//             else
//                 return res.status(401).json({ error: 'Invalid username/email.' });
//         } catch (error) {
//             console.error('Error during user login:', error);
//             return res.status(500).json({ error: 'Something went wrong while logging in the user.' });
//         }
//     } catch (error) {
//         console.error('Some Login Error: ', error);
//         return res.status(400).json({ error: error.message });
//     }
// };

// export { loginUser };







// import mysql from 'mysql';
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import bcrypt from 'bcrypt';
// import connection from '../db/connection.js'; // Make sure connection is using mysql2/promise

// const registerUser = async (req, res) => {
//     console.log('Request Body:', req.body);
//     const { userName, password, name, email, phone } = req.body;

//     // 1. Basic validations
//     if (!userName || !password || !name || !email || !phone) {
//         throw new ApiError(400, 'All fields are required.');
//     }

//     // 2. Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         throw new ApiError(400, 'Invalid email format.');
//     }

//     // 3. Validate phone number
//     const phoneRegex = /^[0-9]{10,20}$/;
//     if (!phoneRegex.test(phone)) {
//         throw new ApiError(400, 'Invalid phone number format. Must be 10-20 digits.');
//     }

//     // 4. Validate password strength
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     if (!passwordRegex.test(password)) {
//         throw new ApiError(400, 'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 number.');
//     }

//     try {
//         // 5. Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
//         console.log(hashedPassword);

//         // 6. Check if the username or email already exists
//         const [rows] = await connection.execute(
//             'SELECT * FROM User WHERE userName = ? OR email = ?',
//             [userName, email]
//         );

//         if (rows.length > 0) {
//             throw new ApiError(409, 'Username or email already taken.');
//         }

//         // 7. Insert new user into the database
//         const [result] = await connection.execute(
//             `INSERT INTO User (userName, name, password, email, phone) VALUES (?, ?, ?, ?, ?)`,
//             [userName, name, hashedPassword, email, phone]
//         );

//         const createdUser = {
//             id: result.insertId,
//             userName,
//             name,
//             email,
//             phone
//         };

//         // 8. Return success response
//         return res.status(201).json(
//             new ApiResponse(200, createdUser, 'User registered successfully.')
//         );
//     } catch (error) {
//         console.error('Error during user registration:', error);
//         throw new ApiError(500, 'Something went wrong while registering the user.');
//     }
// };

// export { registerUser };










// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import bcrypt from 'bcrypt';
// import connection from '../db/connection.js';

// const registerUser = (req, res) => {
//     console.log('Request Body:', req.body);
//     const { userName, password, name, email, phone } = req.body;

//     // 1. Basic validations
//     if (!userName || !password || !name || !email || !phone) {
//         throw new ApiError(400, 'All fields are required.');
//     }

//     // 2. Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         throw new ApiError(400, 'Invalid email format.');
//     }

//     // 3. Validate phone number
//     const phoneRegex = /^[0-9]{10,20}$/;
//     if (!phoneRegex.test(phone)) {
//         throw new ApiError(400, 'Invalid phone number format. Must be 10-20 digits.');
//     }

//     // 4. Validate password strength
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     if (!passwordRegex.test(password)) {
//         throw new ApiError(400, 'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 number.');
//     }

//     try {

//         // 5. Hash the password
//         const hashedPassword = bcrypt.hash(password, 10);
//         console.log(hashedPassword);
//         // 6. Check if the username or email already exists
//         connection.query(
//             'SELECT * FROM User WHERE userName = ? OR email = ?',
//             [userName, email],
//             (err, rows) => {
//                 if (err) {
//                     console.log("hello");
//                     throw new ApiError(500, 'Database query failed');
//                 }

//                 if (rows.length > 0) {
//                     throw new ApiError(409, 'Username or email already taken.');
//                 }

//                 // 7. Insert new user into the database
//                 connection.query(
//                     `INSERT INTO User (userName, name, password, email, phone) VALUES (?, ?, ?, ?, ?)`,
//                     [userName, name, hashedPassword, email, phone],
//                     (err, result) => {
//                         if (err) {
//                             throw new ApiError(500, 'Database query failed');
//                         }

//                         const createdUser = {
//                             id: result.insertId,
//                             userName,
//                             name,
//                             email,
//                             phone
//                         };

//                         // 8. Return success response
//                         return res.status(201).json(
//                             new ApiResponse(200, createdUser, 'User registered successfully.')
//                         );
//                     }
//                 );
//             }
//         );
//     } catch (error) {
//         console.error('Error during user registration:', error);
//         throw new ApiError(500, 'Something went wrong while registering the User.');
//     }
// };

// export { registerUser };




const authenticateUser = (req, res) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Expecting token in "Bearer <token>" format
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify and decode the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }

        const userId = decoded.id; // Extract user ID from the decoded token

        // Query the database to check if the user exists
        connection.query('SELECT userName FROM User WHERE id = ?', [userId], (error, results) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error occurred.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // If user exists, respond with the username
            const userName = results[0].userName;
            return res.status(200).json(
                new ApiResponse(200, userName, 'User authenticated successfully.')
            );
        });
    });
};

export { authenticateUser };