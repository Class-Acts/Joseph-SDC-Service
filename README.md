# Server Development Capstone for RGI

> An backend database project that extends the RGI frontend with 10 million primary records store on a Microsoft SQL Server Database, utilizing T-SQL commands. 

# Installation

## Microsoft Server Installation
1. Follow the instructions to install sql server for your operating system. I used linux, but if you use a different operating system, follow Microsoft's guide for installation:
> https://docs.microsoft.com/en-us/sql/database-engine/install-windows/install-sql-server?view=sql-server-2017

For Ubuntu users:
> https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-linux-2017

Extra Resources:
> https://www.microsoft.com/en-us/sql-server/developer-get-started/node/ubuntu/?rtc=1

The above guides should have specific steps for the next steps

2. Install the SQL Server command-line tools
3. Connect Locally
4. Verify that you can create databases and insert tables
> Commands must be written in T-SQL. T-SQL commands are not executed until you type GO on a new line.
5. Create a new login 'student' with password 'Qandapass1234'.
```
CREATE LOGIN student WITH PASSWORD = 'Qandapass1234'
GO
```
6. Create a new user 'student' on database qanda.
```
USE qanda
CREATE USER student
GO
```
7. Grant user 'student' bulk and administrator priveleges
```
USE MASTER
ALTER SERVER ROLE [sysadmin] ADD MEMBER student
GO
```

## Project Installation
From within the root directory:
```
npm install
```

# RGI Front-end Questions and Answers Module

> A module aimed at cloning the styles and functionality of the REI website's question and answers section on a product page.

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> To start the server: npm start
> To run webpack and watch files for changes: npm run watch
> To seed the database: npm run db:setup
> To add to your index.html file
    - <div id="questions"></div>
    - <script src="http://localhost:4000/bundle.js"></script>


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

