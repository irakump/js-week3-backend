-- App user
CREATE USER 'cats'@'localhost' IDENTIFIED BY 'dogsarebest';

-- Give all privileges to all tables
GRANT ALL PRIVILEGES ON `wskcats`.* TO 'cats'@localhost;

-- Update privileges
FLUSH PRIVILEGES;
