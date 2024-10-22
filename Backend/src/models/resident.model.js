export const createTableResident = `
CREATE TABLE IF NOT EXISTS Resident (
id INT AUTO_INCREMENT PRIMARY KEY,
hotelReservationId int NOT NULL,
name VARCHAR(50) not null,
passportOrCnic VARCHAR(50) not null,
FOREIGN KEY (hotelReservationId) REFERENCES HotelReservation(id)
)
`;