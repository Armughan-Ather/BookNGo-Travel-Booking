export const createTableBundle = `
CREATE TABLE IF NOT EXISTS Bundle (
flightId INT NOT NULL,
hotelName VARCHAR(100) NOT NULL,
discount INT NOT NULL,
PRIMARY KEY (flightId, hotelName),
FOREIGN KEY (flightId) REFERENCES Flight(id),
FOREIGN KEY (hotelName) REFERENCES Hotel(name)
)
`;