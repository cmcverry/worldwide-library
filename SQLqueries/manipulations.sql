-- For all queries, @ character denote the variables that will have data from the backend programming language

--## Rooms Queries ##
-- gets roomNumber and capacity columns from Rooms entity
SELECT `roomNumber`, `capacity` FROM `Rooms`;

-- adds new row to Rooms
INSERT INTO `Rooms` VALUES (@room_num, @capacity);

-- deletes row from Rooms 
DELETE FROM `Rooms` WHERE `roomNumber` = @room_num;

-- edits row in Rooms
UPDATE `Rooms` SET  `capacity` = @capacity WHERE `roomNumber` = @room_num;


-- ## Genres Queries ##
-- gets id column from Genres entity
SELECT `name` from `Genres`;

-- adds new row to Genres
INSERT INTO `Genres` (`name`) VALUES (@genre_name);

-- delete row from Genres
DELETE FROM `Genres` WHERE `id` = @genre_id;

-- edits row in Genres
UPDATE `Genres` SET `name` = @genre_name WHERE `id` = @genre_id;


-- ## Librarians Queries ##
-- gets employeeID, firstName, lastName, and focus from Librarians entity
SELECT `employeeID`, `firstName`, `lastName`, Genres.name as `focus` FROM `Librarians` LEFT JOIN `Genres` ON `focus` = Genres.id;

--adds row to Librarians 
INSERT INTO `Librarians` (`firstName`, `lastName`, `focus`) VALUES (@lib_fName, @lib_lName, @focus);

--deletes row from Librarians
DELETE FROM `Librarians` WHERE `employeeID` = @employee_id;

--edits row in Librarians 
UPDATE `Librarians` SET `firstName` = @lib_fName, `lastName` = @lib_lName, `focus` = @focus WHERE `employeeID` = @employee_id;


-- ## Patrons Queries ## 
-- Patron creating a new account
INSERT INTO `Patrons` (`firstName`, `lastName`) VALUES (@pat_fName, @pat_lName);

-- Viewing Patrons
SELECT `libraryID`, `firstName`, `lastName`, Rooms.roomNumber as`reservation` FROM `Patrons` LEFT JOIN `Rooms` ON `reservation` = Rooms.roomNumber;

-- gets room reserved by specific patron
SELECT Rooms.roomNumber as `reservation` from `Patrons` INNER JOIN `Rooms` ON `reservation` = Rooms.roomNumber WHERE `libraryID` = @patron_id;

-- Editing Patrons
UPDATE `Patrons` SET `firstName` = @pat_fName, `lastName` = @pat_lName, `reservation` WHERE `libraryID` = @patron_id;

-- Deleting Patrons
DELETE FROM `Patrons` WHERE `libraryID` = @patron_id;


-- ## Books Queries ## 
-- Adding a book
INSERT INTO `Books` (`isbn`, `title`, `author`, `genre`) VALUES (@isbn, @title, @author, @book_genre);

-- Viewing books
SELECT `isbn`, `title`, `author`, Genres.name as `genre` FROM `Books` LEFT JOIN `Genres` ON `genre` = Genres.id;

-- Searching for a book
SELECT `isbn`, `title`, `author`, Genres.name as `genre` FROM `Books` LEFT JOIN `Genres` ON `genre` = Genres.id
WHERE `title` = @title;

-- Editing books
UPDATE `Books` SET `title` = @title, `author` = @author, `genre` = @book_genre WHERE `isbn` = @book_genre;

-- Deleting books
DELETE FROM `Books` WHERE `isbn` = @isbn;


-- ## Patron_book Queries ##
-- Adding a rental (CREATE)
INSERT INTO `Patron_book` (`pid`, `bid`, `checkoutDate`, `returnDate`) VALUES (@pid, @bid, @checkoutDate, @returnDate);

-- Viewing Rentals (SELECT)
SELECT Patrons.libraryID as `pid`, Books.isbn as `bid`, `checkoutDate`, `returnDate` FROM Patron_book LEFT JOIN `Patrons` ON `pid` = Patrons.libraryID
LEFT JOIN `Books` ON `bid` = Books.isbn; 

-- Returning book (DELETE)
DELETE FROM `Patron_book` WHERE `pid` = @pid AND `bid` = @bid;
