DROP TABLE IF EXISTS `Librarians`;
DROP TABLE IF EXISTS `Patron_book`;
DROP TABLE IF EXISTS `Books`;
DROP TABLE IF EXISTS `Patrons`;
DROP TABLE IF EXISTS `Genres`;
DROP TABLE IF EXISTS `Rooms`;


CREATE TABLE `Genres` (
    `id` INT(11) AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE `Librarians` (
    `employeeID` INT(11) AUTO_INCREMENT NOT NULL,
    `firstName` VARCHAR(255),
    `lastName` VARCHAR(255),
    `focus` INT(11),
    PRIMARY KEY (`employeeID`),
    CONSTRAINT `FK_GenresLibrarians`
    FOREIGN KEY (focus) REFERENCES Genres (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE `Rooms` (
    `roomNumber` INT(11) NOT NULL,
    `capacity` INT(11),
    PRIMARY KEY (`roomNumber`)
) ENGINE = InnoDB;

CREATE TABLE `Patrons` (
	`libraryID` INT(11) PRIMARY KEY AUTO_INCREMENT,
	`firstName` VARCHAR(255),
	`lastName` VARCHAR(255),
	`reservation` INT(11),
	 CONSTRAINT `FK_RoomsPatrons` 
     FOREIGN KEY (`reservation`) REFERENCES Rooms(`roomNumber`) ON DELETE SET NULL ON UPDATE CASCADE
	) ENGINE = InnoDB;
    
CREATE TABLE `Books` (
	`isbn` INT(255) PRIMARY KEY,
	`title` VARCHAR(255),
	`author` VARCHAR(255),
	`genre` INT(11),
    CONSTRAINT `FK_GenresBooks`
	FOREIGN KEY (`genre`) REFERENCES Genres(id) ON DELETE SET NULL ON UPDATE CASCADE
	) ENGINE = InnoDB;

CREATE TABLE `Patron_book` (
	`pid` INT(11),
	`bid` INT(255),
	`checkoutDate` DATE,
	`returnDate` DATE,
    CONSTRAINT `FK_PatronsPatron_book`
	FOREIGN KEY (`pid`) REFERENCES Patrons(libraryID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_BooksPatron_book`
	FOREIGN KEY (`bid`) REFERENCES Books(isbn) ON DELETE CASCADE ON UPDATE CASCADE
	) ENGINE = InnoDB;
	  
LOCK TABLES `Genres` WRITE;
INSERT INTO `Genres` (`name`) VALUES ("Fiction");
INSERT INTO `Genres` (`name`) VALUES ("Horror");
INSERT INTO `Genres` (`name`) VALUES ("Tragedy");
UNLOCK TABLES;

LOCK TABLES `Books` WRITE;
INSERT INTO `Books` VALUES ('9780446310789', 'To Kill a Mockingbird', 'Harper Lee', 1), 
('19849780140862539', '1984', 'George Orwell', 1), 
('9781405879910', 'The Great Gatsby', 'F. Scott Fitzgerald', 3), 
('9783839893876', 'Pride and Prejudice', 'Jane Austen', NULL), 
('9780399529207', 'Lord of the Flies', 'William Golding', NUll), 
('9781982136079', '1922', 'Stephen King', 2);
UNLOCK TABLES;

LOCK TABLES `Librarians` WRITE;
INSERT INTO `Librarians` (`firstName`, `lastName`, `focus`) VALUES ("Benjamin", "Murphy", 2);
INSERT INTO `Librarians` (`firstName`, `focus`) VALUES ("Jack", 1);
INSERT INTO `Librarians` (`firstName`, `lastName`) VALUES ("Jessica", "Barn");
UNLOCK TABLES;

LOCK TABLES `Rooms` WRITE;
INSERT INTO `Rooms` (`roomNumber`, `capacity`) VALUES (102, 50);
INSERT INTO `Rooms` (`roomNumber`, `capacity`) VALUES (100, 10);
INSERT INTO `Rooms` (`roomNumber`, `capacity`) VALUES (101, 2);
UNLOCK TABLES;

LOCK TABLES `Patrons` WRITE;
INSERT INTO `Patrons` VALUES (1, 'Daniel', 'Park', 102), (2, 'Muhammad', 'Lee', 102), 
(3, 'Michael', 'Calmis', NULL), (4, 'Mason', 'Sperling', 100), (5, 'Emily', 'Koch', NULL), 
(6, 'Cordelia', 'Watson', NULL), (7, 'Danny', 'Padilla', 100);
UNLOCK TABLES;

LOCK TABLES `Patron_book` WRITE;
INSERT INTO `Patron_book` VALUES (1, '9780399529207', '2020-12-05', '2020-12-20'),
(5, '19849780140862539', '2021-2-12', '2021-2-19'),
(3, '9781405879910', '2021-2-08', '2022-2-20'),
(7, '9780399529207', '2020-12-05', '2020-12-20');
UNLOCK TABLES;
