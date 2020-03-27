// JavaScript program to convert muliple csv files to json files

console.log('JavaScript Program To Convert CSV Files to JSON Files');

console.log("\nreadFileSync method...");

var fs = require('fs');
var readDowCSV = fs.readFileSync('data/dow.csv', 'utf8').split(/\r?\n/);
var readNasdaqCSV = fs.readFileSync('data/nasdaq.csv', 'utf8').split(/\r?\n/);
var readSp500CSV = fs.readFileSync('data/sp500.csv', 'utf8').split(/\r?\n/);

let jsonArray = csvArray => {
    let repDay = [];
    let linecount;

    for (linecount = 2; linecount < csvArray.length; linecount++) {
        let prevDay = csvArray[linecount - 1].split(',');
        let prevDayClose = prevDay[5];
        let csvDay = csvArray[linecount].split(',');

        // repDay
        //  date
        //  dayClose
        //  dayRange
        //  prevDayChange
        //  prevDayPctChange
        repDay.push({
            "day": csvDay[0],
            "dayClose": parseFloat(csvDay[5]).toFixed(2),
            "dayRange": parseFloat(csvDay[2] - csvDay[3]).toFixed(2),
            "dayPtsChgPrevDay": parseFloat(csvDay[5] - prevDayClose).toFixed(2),
            "dayPctChgPrevDay": parseFloat(((csvDay[5] - prevDayClose) / prevDayClose) * 100).toFixed(2) + "%"
        })
    }

    //console.log("repDay: ", JSON.stringify(repDay));

    return repDay;

}

let jsonFileBuild = (dowRepDay, nasdaqRepDay, sp500RepDay) => {

    let dowJson = {
        "ticker": "^DJI",
        "name": "Dow Jones Industrial Average",
        "tradingdays": dowRepDay
    }

    let nasdaqJson = {
        "ticker": "^IXIC",
        "name": "NASDAQ",
        "tradingdays": nasdaqRepDay
    }

    let sp500Json = {
        "ticker": "^GSPC",
        "name": "S&P 500",
        "tradingdays": sp500RepDay
    }

    let allIndexesJson = {
        "market-ind": [
            dowJson,
            nasdaqJson,
            sp500Json
        ]
    }

    return allIndexesJson;

}

let dowRepDay = jsonArray(readDowCSV);
let nasdaqRepDay = jsonArray(readNasdaqCSV);
let sp500RepDay = jsonArray(readSp500CSV);

let allIndexes = jsonFileBuild(dowRepDay, nasdaqRepDay, sp500RepDay);

fs.writeFileSync('./data/all-mrkt-ind.json', JSON.stringify(allIndexes));


