# nodejs-batch-yfin-csv-to-json
NodeJS Program to convert Yahoo Finance CSV files to JSON file

1.  Need the following Yahoo Finance Historical Prices CSV files

data/dow.json
data/nasdaq.json
data/sp500.json


2.  To create a consolidated JSON file with all three market indexes, 
from project root directory, run the following command

node yahooFinCsv2Json.js


3.  To run npm json-server application,

From project root directory, run the following command 

json-server --watch data/all-mrkt-ind.json --port 3001



