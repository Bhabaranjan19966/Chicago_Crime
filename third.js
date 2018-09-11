var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');

var instream = fs.createReadStream('Crimes_-_2001_to_present.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});
var v = [];
var mySet = new Set();
var myMap = new Map();
const hasrobbery = /ROBBERY/;
rl.on('line',(line)=>{
    
    if(hasrobbery.test(line)){
        var x = line.split(",");
        var index = x.indexOf('ROBBERY');
        index += 1;
        var previousSize = mySet.size;
        mySet.add(x[index]);
        var afterSize = mySet.size;
        if(previousSize < afterSize ){
            myMap.set(x[index],1);
        }
        else{
            var currentSize = myMap.get(x[index]);
            myMap.set(x[index], currentSize+1);
        }
    }
    
})
rl.on('close', ()=> {
    var iterator1 = myMap[Symbol.iterator]();
        for (let item of iterator1) {
            var prop = {};
            prop[item[0]] = item[1];
            v.push(prop);
        }
        fs.writeFileSync('assignment3.json', JSON.stringify(v), (err) => {
            if (err) {
                console.log('error while parsing');
            }
        });
})