#!/bin/bash

#Executes schema qanda.sql and creates tables
sqlcmd -S localhost -U student -P Qandapass1234 -d qanda -i ./database/sqlcmd/qanda.sql

#Cleans all foreign keys and tables created from qanda.sql. You must run this multiple times to clear all nested foreign keys until no errors result.
sqlcmd -S localhost -U student -P Qandapass1234 -d qanda -i ./database/sqlcmd/cleanDB.sql

#Log in to sqlcmd as student
sqlcmd -S localhost -U student -P Qandapass1234