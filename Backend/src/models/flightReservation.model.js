export const createTableFlightReservation = `
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