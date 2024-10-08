export const createTableHotel = `
CREATE TABLE IF NOT EXISTS Hotel (
name VARCHAR(100) PRIMARY KEY,
standard INT NOT NULL,
deluxe INT NOT NULL,
location VARCHAR(50) NOT NULL,
pricePerNightStandard INT NOT NULL,
pricePerNightDeluxe INT NOT NULL,
rating INT NOT NULL,
ratingCount INT NOT NULL DEFAULT 0
)
`;