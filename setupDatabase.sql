DROP USER IF EXISTS 'basecamp_dev'@'localhost';
CREATE USER IF NOT EXISTS 'basecamp_dev'@'localhost' IDENTIFIED BY 'basecamp_dev_pwd';
DROP DATABASE IF EXISTS basecamp_db;
CREATE DATABASE IF NOT EXISTS basecamp_db;
GRANT ALL PRIVILEGES ON `basecamp_db`.* TO 'basecamp_dev'@'localhost';
GRANT SELECT ON `perfomance_schema`.* TO 'basecamp_dev'@'localhost';
FLUSH PRIVILEGES;
