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
  let index;
  let x;
  if (has.test(line)) {
    if (hasvechile.test(line)) {
      x = line.split(',');
      for (let i = 0; i < x.length; i += 1) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
          index = Number(x[i]);
          break;
        }
      }
      vechile[index - 2001] += 1;
      // console.log(index+"     "+"vechile");
    }
    if (hasstate.test(line)) {
      x = line.split(',');
      for (let i = 0; i < x.length; i += 1) {
        if (Number(x[i]) > 2000 && Number(x[i]) < 2017) {
          index = Number(x[i]);
          break;
        }
      }
      stateup[index - 2001] += 1;
      // console.log(index+"     "+"state");
    }
    if (hasprop.test(line)) {
      x = line.split(',');
      for (let i = 0; i < x.length; i += 1) {
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
  for (let i = 0; i < vechile.length; i += 1) {
    const type = {
      Year: '',
      Property: '',
      Vechile: '',
      State: '',
    };
    type.Year = i + 2000 + 1;
    type.Property = property[i];
    type.State = stateup[i];
    type.Vechile = vechile[i];
    v.push(type);
    // console.log(obj);
  }
  fs.writeFileSync('../json_output/assignment2.json', JSON.stringify(v), (err) => {
    if (err) throw err;
  });
});
