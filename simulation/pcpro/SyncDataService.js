var net = require('net');
var MongoClient = require('mongodb').MongoClient;
fs = require('fs');

var HOST = '10.0.97.243';
var PORT = 60000;
var num=1;
var client = new net.Socket();
var newstr="";
var inPacket =  Buffer.from([0x43,0x00,0x00,0xb4,0x01,0x21,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x18,0x20,0x07,0x20,0x05,0x04,0x11,0x21,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xfe]);//Length -69
var inPacket1 = Buffer.from([0x49,0x00,0x00,0xb4,0x01,0x11,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x00,0x00,0x00,0x08,0x01,0x00,0x1f,0xff,0x00,0x00,0x00,0x00,0x00,0x00,0x05,0x01,0x00,0x02,0x01,0x00,0x01,0x00,0x55,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x50]);//Length -75
var inPacket2 = Buffer.from([0x14,0x00,0x00,0x15,0x01,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x0d,0x60,0x00,0x00,0x00,0x01,0x6b]);//Length -22
var inPacket3 = Buffer.from([0x29,0x00,0x00,0xb4,0x01,0x12,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x06,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x88]);//
function count() {
    num++;
}
function count2() {
    num=num+2;
}
function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if((inputtxt.value.match(phoneno)))
      return true;
      else
        return false;
}
function myDataConnect() { 
client.connect(PORT, HOST, function() {
    console.log('Client connected to: ' + HOST + ':' + PORT);
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
    client.write('\x1f\x00\x00\x01\x00\x21\x00\x00\x61\x64\x6d\x69\x6e\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x23\x25\x29\x39\x2f\x53\x57\x44\x29');
});
}
myDataConnect();
client.on('data', function(data) {    
    console.log('Client received: ' + data);
    var buf = Buffer.from(data);
    var buf1=buf.toString('ascii');
    var res = buf1.substring(32,80);
    var ext=buf1.substring(81,111);
    var ext2=buf1.substring(112,142);
    var buffer = new Buffer(27);
        buffer[0] = 0x19;
        buffer[1] = 0x00;
        buffer[2] = 0x00;
        buffer[3] = 0xb0;
        buffer[4] = 0x00;
        buffer[5] = 0x04;
        buffer[6] = 0x00;
        buffer[7] = 0x00;
        buffer[8] = 0x80;
        buffer[9] = 0x19;
        buffer[10] = 0x01;
        buffer[11] = 0x00;
        buffer[12] = 0x01;
        buffer[13] = 0x00;
        buffer[14] = 0x01;
        buffer[15] = 0x00;
        buffer[16] = 0x01;
        buffer[17] = 0x00;
        buffer[18] = 0x00;
        buffer[19] = 0x00;
        buffer[20] = 0x00;
        buffer[21] = 0x00;
        buffer[22] = 0x00;
        buffer[23] = 0x00;
        buffer[24] = 0x00;
        buffer[25] = 0x00;
        buffer[26] = 0x00;
    if(Number(buf.length)==69)
    //if(!(Buffer.compare(buf,inPacket))) 
    {
    client.write('\x07\x00\x00\x15\x00\x11\x00\x00\x03');
    }
    if(!(Buffer.compare(buf,inPacket1))) 
    //if(Number(buf.length)==75)
    {
    client.write('\x0b\x00\x00\x15\x00\x01\x00\x00\x0d\x60\x47\x04\x31');
    }
    if(!(Buffer.compare(buf,inPacket2))) 
   // if(Number(buf.length)==22)
    {
    client.write('\x07\x00\x00\x00\x00\x12\x00\x00\x15');
    }
    if(!(Buffer.compare(buf,inPacket3))) 
    //if(Number(buf.length)==43)
    {
    client.write(buffer);
    }
    if(Number(buf.length)==114 || Number(buf.length)==179|| Number(buf.length)==147||Number(buf.length)==211)
    {
      res = res.replace(/[^A-Za-z0-9]/g, '');
      ext=ext.replace(/[^0-9]/g, '');
      ext2=ext2.replace(/[^0-9]/g, '');
      console.log(res.toString().trim());
      if(Number(buf.length)==114)
      {
      newstr=newstr+res.toString().trim()+" "+ext.toString().trim()+"\r\n";
      count();
      }
      else if(Number(buf.length)==147)
      {
      newstr=newstr+res.toString().trim()+" "+ext.toString().trim()+" "+ext2.toString().trim()+"\r\n";
      count2();
      }
      console.log(newstr);
      fs.writeFile('helloworld.txt',newstr, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
      });

      var url = "mongodb://localhost:27017/";
      
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Alexa");
        var myobj = { "Name": res.toString().trim(), "Extension": ext.toString().trim(), "Mobile_Number": ext2.toString().trim() };
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });

    console.log(buf.length);
       var hexString = num.toString(16);
       console.log(hexString);
       var str="0x0"+hexString;
       console.log(str);
       var buffer1 = new Buffer(27);
        buffer1[0] = 0x19;
        buffer1[1] = 0x00;
        buffer1[2] = 0x00;
        buffer1[3] = 0xb0;
        buffer1[4] = 0x00;
        buffer1[5] = 0x04;
        buffer1[6] = 0x00;
        buffer1[7] = 0x00;
        buffer1[8] = 0x80;
        buffer1[9] = 0x19;
        buffer1[10] = 0x01;
        buffer1[11] = 0x00;
        buffer1[12] = 0x01;
        buffer1[13] = 0x00;
        buffer1[14] = 0x01;
        buffer1[15] = 0x00;
        buffer1[16] = 0x01;
        buffer1[17] = 0x00;
        buffer1[18] = 0x01;
        buffer1[19] = 0x00;
        buffer1[20] = 0x01;
        buffer1[21] = 0x00;
        buffer1[22] = str;
        buffer1[23] = 0x00;
        buffer1[24] = 0x00;
        buffer1[25] = 0x00;
        buffer1[26] = 0x00;
        console.log(buffer1);
      client.write(buffer1);
    }
    if(Number(buf.length)==82)
    {
    client.destroy();
    }
    else
    {

    }
     if (data.toString().endsWith('exit')) {
       client.destroy();
    }
});
// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Client closed');
});
client.on('error', function(err) {
    console.error(err);
});