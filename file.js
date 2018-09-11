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
var rob = new Array(17);
var burg = new Array(17);
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
    var v =[];
    var obj={
        Primary_Type:"ROBBERY",
        Year:"",
        frequency:0,
    };
    for(i=0 ; i <burg.length;i++){
        var year = 2000 + i+1 ;
        obj.Year = year;
        obj.frequency = burg[i];
        v.push(obj);
        console.log(obj);
    }
    obj.Primary_Type="BURGLARY";
    for(i=0 ; i <rob.length;i++){
        var year = 2000 + i+1;
        obj.Year = year;
        obj.frequency = rob[i];
        v.push(obj);
    }
    fs.writeFileSync('1st.json' , JSON.stringify(v), (err)=> {
        if(err){
            console.log('file not found');
        }
    });
})
