import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { DB_NAME } from "../constants.js";
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import connection from '../db/connection.js';


const registerUser = async (req, res) => {

    try {
        console.log('Request Body:', req.body);
        const { userName, password, name, email, phone } = req.body;

        console.log(userName, password, name, email, phone);

        // 1. Basic validations
        if (!userName || !password || !name || !email || !phone) {
            //throw new ApiError(400, 'All fields are required.');
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // 2. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            //throw new ApiError(400, 'Invalid email format.');
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        // 3. Validate phone number
        const phoneRegex = /^[0-9]{10,20}$/;
        if (!phoneRegex.test(phone)) {
            //throw new ApiError(400, 'Invalid phone number format. Must be 10-20 digits.');
            return res.status(400).json({ error: 'Invalid phone number format. Must be 10-20 digits.' });
        }

        // 4. Validate password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 number.' });
        }

        try {
            console.log("hello");
            // 5. Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed Password:', hashedPassword);



            // const connection = await mysql.createConnection({
            //     host: process.env.MYSQL_HOST || 'localhost',
            //     user: process.env.MYSQL_USER || 'root',
            //     password: process.env.MYSQL_PASSWORD || '',
            //     database: DB_NAME
            // });

            // 6. Check if the username or email already exists
            const rows = await connection.query(
                'SELECT * FROM User WHERE userName = ? OR email = ?',
                [userName, email]
            );

            if (rows.length > 0) {
                //throw new ApiError(409, 'Username or email already taken.');
                return res.status(409).json({ error: 'Username or email already taken.' });
            }

            // 7. Insert new user into the database
            const result = await connection.query(
                `INSERT INTO User (userName, name, password, email, phone) VALUES (?, ?, ?, ?, ?)`,
                [userName, name, hashedPassword, email, phone]
            );

            const createdUser = {
                id: result.insertId,
                userName,
                name,
                email,
                phone
            };

            // 8. Return success response
            return res.status(201).json(
                new ApiResponse(200, createdUser, 'User registered successfully.')
            );
        } catch (error) {
            console.error('Error during user registration:', error);
            return res.status(500).json({ error: error.message });
            //throw new ApiError(500, 'Something went wrong while registering the user.');
        }
    } catch (error) {
        console.error('Some User Error: ', error);
        return res.status(400).json({ error: error.message });
    }
};

export { registerUser };










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