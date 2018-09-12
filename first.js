const fs = require('fs');


const readline = require('readline');


const stream = require('stream');

const instream = fs.createReadStream('Crimes_-_2001_to_present.csv');
const outstream = new stream();
// outstream.readable = true;
// outstream.writable = true;

const rl = readline.createInterface({
  input: instream,
  output: outstream,
  // terminal: false
});
const rob = new Array(16);
const burg = new Array(16);
const v = [];
rob.fill(0);
burg.fill(0);
// console.log(burg[5]);
let ln = 0;
rl.on('line', (x) => {
  ln++;
  if (x.search('ROBBERY') != -1) {
    // console.log(ln);
    var s = x.split(',');
    var index;
    for (i = 0; i < s.length; i++) {
      if (Number(s[i]) > 2000 && Number(s[i]) < 2017) {
        index = Number(s[i]);
        // console.log(s[i]);
        break;
      }
    }
    index -= 2001;
    rob[index] += 1;
    // console.log("rob " + index + "--------------" + "------" + rob[index]);
  }
  if (x.search('BURGLARY') != -1) {
    var s = x.split(',');
    var index;
    for (i = 0; i < s.length; i++) {
      if (Number(s[i]) > 2000 && Number(s[i]) < 2017) {
        index = Number(s[i]);
        break;
      }
    }
    index -= 2001;
    burg[index] += 1;
    // console.log("burg " + index + "--------------" + "------" + burg[index]);
  }
});
rl.on('close', () => {
  // console.log("file ----- closed");


  for (i = 0; i < burg.length; i++) {
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
    // console.log(obj);
  }
  // console.log(v);
  fs.writeFileSync('1st.json', JSON.stringify(v), (err) => {
    if (err) {
      // console.log('file not found');
    }
  });
});
