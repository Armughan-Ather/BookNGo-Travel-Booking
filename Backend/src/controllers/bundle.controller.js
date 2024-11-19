import sequelize from '../config/database.js'; // Sequelize instance
import { ApiResponse } from '../utils/ApiResponse.js'; // Assuming you have this

export const searchValidBundles = async (req, res) => {
    try {
        // Fetch all bundles with flight and hotel details
        const query = `
            SELECT b.id AS bundleId, b.flightId, b.flightIdRet, b.hotelId, b.discount,
                   f.departure AS onwardDate, f.numSeats AS onwardSeats,
                   fr.departure AS returnDate, fr.numSeats AS returnSeats,
                   h.name AS hotelName, h.location AS hotelCity, h.standard AS totalStandardRooms, h.deluxe AS totalDeluxeRooms,
                   fa.name AS onwardAirline, fra.name AS returnAirline, f.origin AS origin, f.destination AS destination,
                   (h.rating+fa.rating+fra.rating)/3 AS avgRating
            FROM Bundle b
            LEFT JOIN Hotel h ON b.hotelId = h.id
            LEFT JOIN Flight f ON b.flightId = f.id
            JOIN Airline fa ON f.airlineId = fa.id
            LEFT JOIN Flight fr ON b.flightIdRet = fr.id
            JOIN Airline fra ON fr.airlineId = fra.id
            WHERE (
                f.numSeats > 0 -- Onward flight must have seats
                AND fr.numSeats > 0 -- Return flight must have seats
            )
        `;

        const bundles = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        if (bundles.length === 0) {
            return res.status(404).json({ error: 'No bundles found.' });
        }

        const validBundles = [];

        for (const bundle of bundles) {
            const onwardDate = new Date(bundle.onwardDate);
            const returnDate = new Date(bundle.returnDate);

            if (isNaN(onwardDate.getTime()) || isNaN(returnDate.getTime())) {
                continue; // Skip invalid dates
            }

            // Check room availability in the given date range
            const roomAvailabilityQuery = `
                SELECT 
                    COALESCE(SUM(CASE 
                        WHEN (hr.reservationDate <= :returnDate AND hr.endDate >= :onwardDate AND hr.type = 'Standard') 
                        THEN hr.noOfRooms ELSE 0 END), 0) AS usedStandardRooms,
                    COALESCE(SUM(CASE 
                        WHEN (hr.reservationDate <= :returnDate AND hr.endDate >= :onwardDate AND hr.type = 'Deluxe') 
                        THEN hr.noOfRooms ELSE 0 END), 0) AS usedDeluxeRooms
                FROM HotelReservation hr
                WHERE hr.hotelId = :hotelId
            `;

            const [roomAvailability] = await sequelize.query(roomAvailabilityQuery, {
                replacements: {
                    hotelId: bundle.hotelId,
                    onwardDate: onwardDate.toISOString().split('T')[0],
                    returnDate: returnDate.toISOString().split('T')[0],
                },
                type: sequelize.QueryTypes.SELECT,
            });

            const availableStandardRooms =
                bundle.totalStandardRooms - roomAvailability.usedStandardRooms;
            const availableDeluxeRooms =
                bundle.totalDeluxeRooms - roomAvailability.usedDeluxeRooms;

            if (availableStandardRooms > 0 || availableDeluxeRooms > 0) {
                validBundles.push({
                    ...bundle,
                    availableStandardRooms,
                    availableDeluxeRooms,
                });
            }
        }

        // Return valid bundles
        if (validBundles.length === 0) {
            return res.status(404).json({ error: 'No valid bundles available.' });
        }

        return res.status(200).json(new ApiResponse(200, validBundles, 'Valid bundles found.'));
    } catch (error) {
        console.error('Error fetching valid bundles:', error);
        return res.status(500).json({ error: 'An error occurred while fetching bundles.' });
    }
};

export const getBundleCost = async (req, res) => {
    const { bundleId, seats, reservationDate, endDate, noOfRooms, roomType } = req.body;

    try {
        if (!bundleId || !seats || !reservationDate || !endDate || !noOfRooms || !roomType) {
            return res.status(400).json({ error: 'bundleId, seats, reservationDate, endDate, noOfRooms, roomType are required.' });
        }

        // Fetch bundle details
        const [bundle] = await sequelize.query(
            `SELECT flightId, flightIdRet, hotelId, discount FROM Bundle WHERE id = ?`,
            { replacements: [bundleId], type: sequelize.QueryTypes.SELECT, transaction }
        );
        if (!bundle) {
            return res.status(404).json({ error: 'Bundle not found' });
        }

        const { flightId, flightIdRet, hotelId, discount } = bundle;

        // Reserve onward flight
        const [onwardFlight] = await sequelize.query(
            `SELECT numSeats, price FROM Flight WHERE id = ?`,
            { replacements: [flightId], type: sequelize.QueryTypes.SELECT, transaction }
        );
        if (!onwardFlight || onwardFlight.numSeats < seats) {
            return res.status(400).json({ error: 'Not enough seats available on the onward flight.' });
        }

        const onwardBill = ((onwardFlight.price * seats) / 100) * (100 - discount);

        // Reserve return flight
        const [returnFlight] = await sequelize.query(
            `SELECT numSeats, price FROM Flight WHERE id = ?`,
            { replacements: [flightIdRet], type: sequelize.QueryTypes.SELECT, transaction }
        );
        if (!returnFlight || returnFlight.numSeats < seats) {
            return res.status(400).json({ error: 'Not enough seats available on the return flight.' });
        }

        const returnBill = ((returnFlight.price * seats) / 100) * (100 - discount);;

        // Reserve hotel
        const roomTypeField = roomType === 'Standard' ? 'standard' : 'deluxe';
        const priceField = roomType === 'Standard' ? 'pricePerNightStandard' : 'pricePerNightDeluxe';

        const [hotel] = await sequelize.query(
            `SELECT ${roomTypeField} AS totalRooms, ${priceField} AS pricePerNight FROM Hotel WHERE id = ?`,
            { replacements: [hotelId], type: sequelize.QueryTypes.SELECT, transaction }
        );

        const [usedRoomsResult] = await sequelize.query(
            `SELECT COALESCE(SUM(noOfRooms), 0) AS usedRooms
             FROM HotelReservation
             WHERE hotelId = ? AND type = ? AND 
                   ((reservationDate BETWEEN ? AND ?) OR (endDate BETWEEN ? AND ?))`,
            {
                replacements: [hotelId, roomType, reservationDate, endDate, reservationDate, endDate],
                type: sequelize.QueryTypes.SELECT,
                transaction,
            }
        );
        const usedRooms = usedRoomsResult.usedRooms;
        const availableRooms = hotel.totalRooms - usedRooms;

        if (availableRooms < noOfRooms) {
            return res.status(400).json({ error: 'Not enough rooms available' });
        }

        const [daysResult] = await sequelize.query(
            'SELECT DATEDIFF(?, ?) AS noOfDays',
            {
                replacements: [endDate, reservationDate],
                type: sequelize.QueryTypes.SELECT,
                transaction,
            }
        );
        const noOfDays = daysResult.noOfDays + 1;

        // Calculate bill based on price per night and number of days
        const totalBill = ((hotel.pricePerNight * noOfRooms * noOfDays) / 100) * (100 - discount);

        // Calculate total bundle cost with discount
        const discountedCost = onwardBill + returnBill + totalBill;

        // Insert bundle reservation
        await sequelize.query(
            `INSERT INTO BundleReservation (userId, bundleId, flightReservationId, flightReservationIdRet, hotelReservationId)
             VALUES (?, ?, ?, ?, ?)`,
            {
                replacements: [userId, bundleId, flightReservationId, flightReservationIdRet, hotelReservationId],
                type: sequelize.QueryTypes.INSERT,
                transaction,
            }
        );
        return res.status(200).json(new ApiResponse(200, discountedCost, 'Discounted Bundle price sent.'));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch bundle price.' });
    }
};