export const createTableHotelReservation = `
CREATE TABLE IF NOT EXISTS HotelReservation (
id INT AUTO_INCREMENT PRIMARY KEY,
hotelId int NOT NULL,
userId int NOt null,
bookingDate DATE DEFAULT CURRENT_TIMESTAMP,
reservationDate DATE DEFAULT CURRENT_TIMESTAMP,
endDate DATE DEFAULT CURRENT_TIMESTAMP,
status VARCHAR(50) NOT NULL DEFAULT 'Booked',
noOfDays INT NOT NULL,
noOfRooms INT NOT NULL DEFAULT 1,
type ENUM('Standard', 'Deluxe') NOT NULL DEFAULT 'Standard',
FOREIGN KEY (hotelId) REFERENCES Hotel(id),
FOREIGN KEY (userId) REFERENCES User(id)
)
`;