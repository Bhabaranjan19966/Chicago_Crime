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
var vechile = new Array(16);
var property= new Array(16);
var stateup= new Array(16);
vechile.fill(0);
property.fill(0);
stateup.fill(0);
rl.on('line', (line)=>{
    if(line.search('Criminal Damage')){
        
    }
})