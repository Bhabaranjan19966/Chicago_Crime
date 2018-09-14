const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('../Crimes_-_2001_to_present.csv');
const Outstream = new Stream();
const rl = readline.createInterface({
  input: instream,
  output: Outstream,
});
const rob = new Array(16);
const burg = new Array(16);
const v = [];
rob.fill(0);
burg.fill(0);
rl.on('line', (x) => {
  let s;
  let index;
  if (x.search('ROBBERY') !== -1) {
    s = x.split(',');

    for (let i = 0; i < s.length; i += 1) {
      if (Number(s[i]) > 2000 && Number(s[i]) < 2017) {
        index = Number(s[i]);
        break;
      }
    }
    index -= 2001;
    rob[index] += 1;
  }
  if (x.search('BURGLARY') !== -1) {
    s = x.split(',');

    for (let i = 0; i < s.length; i += 1) {
      if (Number(s[i]) > 2000 && Number(s[i]) < 2017) {
        index = Number(s[i]);
        break;
      }
    }
    index -= 2001;
    burg[index] += 1;
  }
});
rl.on('close', () => {
  for (let i = 0; i < burg.length; i += 1) {
    const obj = {
      YEAR: '',
      ROBBERY: 0,
      BURGLARY: 0,
    };
    const year = 2000 + i + 1;
    obj.YEAR = year;
    obj.BURGLARY = burg[i];
    obj.ROBBERY = rob[i];
    v.push(obj);
  }
  const obj2 = {
    Primery_Crime: v,
  };
  fs.writeFileSync('../json_output/1st.json', JSON.stringify(obj2), (err) => {
    if (err) {
      throw err;
    }
  });
});
