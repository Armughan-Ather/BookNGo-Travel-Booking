export const createTableBundle = `
CREATE TABLE IF NOT EXISTS Bundle (
flightId INT NOT NULL,
hotelId int NOT NULL,
discount INT NOT NULL,
PRIMARY KEY (flightId, hotelId),
FOREIGN KEY (flightId) REFERENCES Flight(id),
FOREIGN KEY (hotelId) REFERENCES Hotel(id)
)
`;