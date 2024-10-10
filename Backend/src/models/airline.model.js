export const createTableAirline = `
CREATE TABLE IF NOT EXISTS Airline (
id int auto_increment PRIMARY KEY,
name VARCHAR(100) unique,
rating INT NOT NULL,
ratingCount INT NOT NULL DEFAULT 0
)
`;