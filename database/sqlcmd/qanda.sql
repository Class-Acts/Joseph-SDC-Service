CREATE SCHEMA qanda;
GO

CREATE TABLE qanda.Products (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Seller NVARCHAR(50)
);
GO

INSERT INTO qanda.Products (Name, Seller) VALUES
(N'Shoe', N'Nike'),
(N'Coat', N'Northface'),
(N'Hat', N'Cubs');
GO

SELECT * FROM qanda.Products;
GO