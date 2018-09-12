const fs = require('fs');


const readline = require('readline');


const stream = require('stream');

const instream = fs.createReadStream('Crimes_-_2001_to_present.csv');
const outstream = new stream();
outstream.readable = true;
outstream.writable = true;

const rl = readline.createInterface({
  input: instream,
  output: outstream,
  terminal: false,
});
const vechile = new Array(16);
const property = new Array(16);
const stateup = new Array(16);
vechile.fill(0);
property.fill(0);
stateup.fill(0);
const hasvechile = /TO PROPERTY/;
const hasprop = /TO VEHICLE/;
const hasstate = /TO STATE SUP PROP/;
const has = /CRIMINAL DAMAGE/;
rl.on('line', (line) => {
  if (has.test(line)) {
    if (hasvechile.test(line)) {
      var index;
      var x = line.split(',');
      for (i = 0; i < x.length; i++) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
          index = Number(x[i]);
          break;
        }
      }
      vechile[index - 2001] += 1;
      // console.log(index+"     "+"vechile");
    }
    if (hasstate.test(line)) {
      var index;
      var x = line.split(',');
      for (i = 0; i < x.length; i++) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
          index = Number(x[i]);
          break;
        }
      }
      stateup[index - 2001] += 1;
      // console.log(index+"     "+"state");
    }
    if (hasprop.test(line)) {
      var index;
      var x = line.split(',');
      for (i = 0; i < x.length; i++) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
          index = Number(x[i]);
          break;
        }
      }
      property[index - 2001] += 1;
      // console.log(index+"     "+"prop");
    }
  }
});
rl.on('close', () => {
  const v = [];
  for (i = 0; i < vechile.length; i++) {
    const type = {
      Property: '',
      Vechile: '',
      State: '',
    };
    const obj = {
      Year: '',
      Types: type,
    };
    type.Property = property[i];
    type.State = stateup[i];
    type.Vechile = vechile[i];
    obj.Year = 2000 + i + 1;
    v.push(obj);
    // console.log(obj);
  }
  fs.writeFileSync('assignment2.json', JSON.stringify(v), (err) => {
    console.log('error while writing');
  });
});
