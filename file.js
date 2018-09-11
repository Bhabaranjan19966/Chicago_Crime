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
var rob = new Array(16);
var burg = new Array(16);
var v =[];
rob.fill(0);
burg.fill(0);
console.log(burg[5]);
rl.on('line', function(line) {
    if(line.search('ROBBERY')){
        var s = line.split(",");
        var index;
        for(i = 0 ; i<s.length;i++){
            if(Number(s[i])>2000 && Number(s[i])<2017){
                index=Number(s[i]);
                break;
            }
        }
        index -= 2001;
        rob[index] +=1;

        console.log( "rob " +index+ "--------------" + "------" + rob[index] );
    }
    if(line.search('BURGLARY')){
        var s = line.split(",");
        var index;
        for(i = 0 ; i<s.length;i++){
            if(Number(s[i])>2000 && Number(s[i])<2017){
                index=Number(s[i]);
                break;
            }
        }
        index -= 2001;
        burg[index] +=1;
        console.log( "burg " +index+ "--------------" + "------" + burg[index] );
    }

});
rl.on('close',()=>{
    console.log("file ----- closed");
    
    
    for(i=0 ; i <burg.length;i++){
        var obj={
            YEAR:"",
            ROBBERY:0,
            BURGLARY:0,
        };
        var year = 2000 + i+1 ;
        obj.YEAR = year;
        obj.BURGLARY = burg[i];
        obj.ROBBERY=rob[i];
        v.push(obj);
        console.log(obj);
    }
    console.log(v);
    fs.writeFileSync('1st.json' , JSON.stringify(v), (err)=> {
        if(err){
            console.log('file not found');
        }
    });
})
