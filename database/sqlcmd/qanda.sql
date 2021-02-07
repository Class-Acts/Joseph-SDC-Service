CREATE SCHEMA qanda;
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Products' and xtype='U')
    create table Products (
        Name varchar(64) not null

    )
GO

CREATE TABLE customer_services.jobs(
    job_id INT PRIMARY KEY IDENTITY,
    customer_id INT NOT NULL,
    description VARCHAR(200),
    created_at DATETIME2 NOT NULL
);

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