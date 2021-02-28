CREATE TABLE Product (
    ID int IDENTITY(1,1) PRIMARY KEY,
    Name varchar(100) NOT NULL,
    Price decimal(9,2),
    Description nvarchar(200)
);

INSERT INTO Product (Name, Price, Description)
	VALUES ('Dog Shampoo', 10.57, 'shampoo for long hair dogs');

INSERT INTO Product (Name, Price, Description)
	VALUES ('WD Red 4 TB', 150.99, 'NAS hard drive');

INSERT INTO Product (Name, Price, Description)
	VALUES ('2018 Nissan Mourano', 37866.99, 'Nissan Mourano AWD with Tech Package?');

SELECT * INTO Product_Copy FROM PRODUCT;

DELETE FROM Product_Copy WHERE Name = 'WD Red 4 TB';