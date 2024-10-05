export const createTableAdmin = `
CREATE TABLE IF NOT EXISTS Admin (
id VARCHAR(20) PRIMARY KEY,
password VARCHAR(100) NOT NULL,
lastLogin TIMESTAMP
)
`;
// UPDATE Admin SET last_login = NOW() WHERE id = 1;