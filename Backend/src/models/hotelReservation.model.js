export const createTableHotelReservation = `
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