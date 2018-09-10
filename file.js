var csv = require('fast-csv');
var fs = require('fs');
var stream = fs.createReadStream("Crimes_-_2001_to_present.csv");
var v = [];
var myMap = new Map();
var mySet = new Set();
csv
    .fromStream(stream, { headers: [, , , , , "Primary_Type", "Description", , , , , , , , , , , "Year", , , , ,] })
    .on("data", function (data) {
        if (data.Primary_Type == "ROBBERY") {
            var previousSize = mySet.size;
            mySet.add(data.Description);
            var afterSize = mySet.size;
            //checking if it is a new type or robbery
            if (previousSize < afterSize) {
                myMap.set(data.Description, 1);
            }
            else {
                var previousValue = myMap.get(data.Description);
                myMap.set(data.Description, previousValue + 1);
                console.log(previousValue + "prev1");
                console.log((previousValue + 1) + "prev2");
            }
        }
    })
    .on("end", function () {
        var iterator1 = myMap[Symbol.iterator]();
        for (let item of iterator1) {
            var prop = {};
            prop[item[0]] = item[1];
            v.push(prop);
        }
        fs.writeFileSync('2end.json', JSON.stringify(v), (err) => {
            if (err) {
                console.log('error while parsing');
            }
        });
    });
