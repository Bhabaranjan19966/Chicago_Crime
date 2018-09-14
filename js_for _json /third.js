const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('../Crimes_-_2001_to_present.csv');
const outstream = new Stream();
outstream.readable = true;
outstream.writable = true;
const rl = readline.createInterface({
  input: instream,
  output: outstream,
  terminal: false,
});
const v = [];
const mySet = new Set();
const myMap = new Map();
const hasrobbery = /ROBBERY/;
rl.on('line', (line) => {
  if (hasrobbery.test(line)) {
    const x = line.split(',');
    let index = x.indexOf('ROBBERY');
    index += 1;
    const previousSize = mySet.size;
    mySet.add(x[index]);
    const afterSize = mySet.size;
    if (previousSize < afterSize) {
      myMap.set(x[index], 1);
    } else {
      const currentSize = myMap.get(x[index]);
      myMap.set(x[index], currentSize + 1);
    }
  }
});
rl.on('close', () => {
  const iterator1 = myMap[Symbol.iterator]();
  for (const item of iterator1) {
    const prop = {};
    prop.Type = item[0];
    prop.Count = item[1];
    v.push(prop);
  }
  fs.writeFileSync('../json_output/assignment3.json', JSON.stringify(v), (err) => {
    if (err) {
      throw err;
    }
  });
});
