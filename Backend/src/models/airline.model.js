export const createTableAirline = `
CREATE TABLE IF NOT EXISTS Airline (
name VARCHAR(100) PRIMARY KEY,
rating INT NOT NULL,
ratingCount INT NOT NULL DEFAULT 0
)
`;