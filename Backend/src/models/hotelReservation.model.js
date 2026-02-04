export const createTableHotelReservation = `
CREATE TABLE IF NOT EXISTS HotelReservation (
id INT AUTO_INCREMENT PRIMARY KEY,
hotelId int NOT NULL,
userId int NOt null,
bookingDate DATETIME DEFAULT CURRENT_TIMESTAMP,
reservationDate DATE NOT NULL,
endDate DATE NOT NULL,
status VARCHAR(50) NOT NULL DEFAULT 'Booked',
noOfRooms INT NOT NULL DEFAULT 1,
bill INT NOT NULL,
type ENUM('Standard', 'Deluxe') NOT NULL DEFAULT 'Standard',
FOREIGN KEY (hotelId) REFERENCES Hotel(id),
FOREIGN KEY (userId) REFERENCES User(id)
)
`;