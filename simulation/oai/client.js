const HOST = '10.0.97.243';
const PORT = 60030;
const net = require('net');
const client = net.createConnection(PORT,HOST);

// Outgoing packets
var outPacket1 = Buffer.from([0x60,0x1c,0x80,0x02,0x00,0x00,0xa3,0x03,0x06,0x01,0x00,0xa4,0x11,0x08,0x0f,0x4e,0x45,0x43,0x20,0x43,0x26,0x43,0x20,0x28,0x4f,0x41,0x49,0x29,0x20,0x58]);  /*60:1c:80:02:00:00:a3:03:06:01:00:a4:11:08:0f:4e:45:43:20:43:26:43:20:28:4f:41:49:29:20:58	// Frame 1	//	outPacket1*/
var outPacket2 = Buffer.from([0xa1,0x15,0x30,0x13,0x02,0x01,0x01,0x02,0x01,0x28,0x30,0x0b,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0x82,0x01,0x95]); /*a1:15:30:13:02:01:01:02:01:28:30:0b:a0:06:04:01:01:04:01:01:82:01:95	//	Frame 3	//	outPacket2*/
var outPacket3 = Buffer.from([0xa1,0x15,0x30,0x13,0x02,0x01,0x03,0x02,0x01,0x28,0x30,0x0b,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0x82,0x01,0x62]); /*a1:15:30:13:02:01:03:02:01:28:30:0b:a0:06:04:01:01:04:01:01:82:01:62	//	Frame 4	//	outPacket3*/
var outPacket4 = Buffer.from([0xa1,0x15,0x30,0x13,0x02,0x01,0x05,0x02,0x01,0x28,0x30,0x0b,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0x82,0x01,0xb5]);
var outPacket5 = Buffer.from([0xa1,0x32,0x30,0x30,0x02,0x01,0x07,0x02,0x01,0x95,0x30,0x28,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0x82,0x1e,0x49,0x48,0x32,0x30,0x30,0x30,0x61,0x74,0x74,0x74,0x74,0x74,0x74,0x64,0x73,0x63,0x56,0x61,0x6c,0x69,0x64,0x61,0x74,0x65,0x32,0x30,0x30,0x30,0x2e,0x00]);  /*a1:32:30:30:02:01:07:02:01:95:30:28:a0:06:04:01:01:04:01:01:82:1e:49:48:32:30:30:30:61:74:74:74:74:74:74:64:73:63:56:61:6c:69:64:61:74:65:32:30:30:30:2e:00	// Frame 9	//	outPacket5*/
var outPacket6 = Buffer.from([0xa1,0x15,0x30,0x13,0x02,0x01,0x09,0x02,0x01,0x29,0x30,0x0b,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0x82,0x01,0x95]); /*a1:15:30:13:02:01:09:02:01:29:30:0b:a0:06:04:01:01:04:01:01:82:01:95	// Frame 11	//	outPacket6*/
var outPacket7 = Buffer.from([0xa1,0x15,0x30,0x13,0x02,0x01,0x0b,0x02,0x01,0x29,0x30,0x0b,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0x82,0x01,0xb5]); /*a1:15:30:13:02:01:0b:02:01:29:30:0b:a0:06:04:01:01:04:01:01:82:01:b5	//	Frame	13	//	outPacket7*/
var outPacket8 = Buffer.from([0xa1,0x15,0x30,0x13,0x02,0x01,0x0d,0x02,0x01,0x28,0x30,0x0b,0xa0,0x06,0x04,0x01,0x00,0x04,0x01,0x01,0x82,0x01,0x69]);
var outPacket9 = Buffer.from([0xa2,0x10,0x30,0x0e,0x02,0x02,0x10,0xd6,0x30,0x08,0xa0,0x06,0x04,0x01,0x00,0x04,0x01,0x01]);  //a2:10:30:0e:02:02:10:d6:30:08:a0:06:04:01:00:04:01:01
var outPacket10 = Buffer.from([0xa1,0x34,0x30,0x32,0x02,0x01,0x4f,0x02,0x01,0x69,0x30,0x2a,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0xa2,0x0f,0xa0,0x0d,0x04,0x01,0x01,0x04,0x02,0x00,0x00,0x04,0x04,0x02,0x08,0x0a,0x0a,0xa3,0x06,0x80,0x04,0x03,0x0a,0x03,0x04,0x84,0x01,0x02,0x85,0x01,0x03,0x86,0x01,0x01]); //a1:34:30:32:02:01:0f:02:01:69:30:2a:a0:06:04:01:01:04:01:01:a2:0f:a0:0d:04:01:01:04:02:00:00:04:04:04:03:0a:0a:a3:06:80:04:03:0a:03:04:84:01:02:85:01:03:86:01:01

// Incoming packets
var inPacket1 = Buffer.from([0x61,0x0c,0x80,0x02,0x00,0x00,0x81,0x01,0x00,0xa3,0x03,0x06,0x01,0x00]); /*61:0c:80:02:00:00:81:01:00:a3:03:06:01:00	// Frame 2	// inPacket1*/
var inPacket2 = Buffer.from([0xa2,0x0f,0x30,0x0d,0x02,0x01,0x01,0x30,0x08,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01]);  /*a2:0f:30:0d:02:01:01:30:08:a0:06:04:01:01:04:01:01	// Frame 5	//	inPacket2*/
var inPacket3 = Buffer.from([0xa3,0x15,0x30,0x13,0x02,0x01,0x03,0x02,0x01,0x02,0x30,0x0b,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0x81,0x01,0x02]);  /*a3:15:30:13:02:01:03:02:01:02:30:0b:a0:06:04:01:01:04:01:01:81:01:02	// Frame 7	//	inPacket3*/
var inPacket4 = Buffer.from([0xa2,0x0f,0x30,0x0d,0x02,0x01,0x05,0x30,0x08,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01]);  /*a2:0f:30:0d:02:01:05:30:08:a0:06:04:01:01:04:01:01	// Frame 8	//	inPacket4*/
var inPacket5 = Buffer.from([0x30,0x82,0x00,0x1f]);  /*30:82:00:1f:02:02:e9:a8:02:01:b5:30:82:00:14:a0:06:04:01:01:04:01:01:82:0a:49:59:32:30:30:30:31:30:31:0a	// Frame 10	//	inPacket5*/
var inPacket6 = Buffer.from([0xa2,0x0f,0x30,0x0d,0x02,0x01,0x09,0x30,0x08,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01]);  /*a2:0f:30:0d:02:01:09:30:08:a0:06:04:01:01:04:01:01	// Frame 12	//	inPacket6*/
var inPacket7 = Buffer.from([0xa2,0x0f,0x30,0x0d,0x02,0x01,0x0b,0x30,0x08,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01]);  /*a2:0f:30:0d:02:01:0b:30:08:a0:06:04:01:01:04:01:01	// Frame 14	//	inPacket7*/
var inPacket8 = Buffer.from([0xa2,0x0f,0x30,0x0d,0x02,0x01,0x0d,0x30,0x08,0xa0,0x06,0x04,0x01,0x00,0x04,0x01,0x01]);  //a2:0f:30:0d:02:01:0d:30:08:a0:06:04:01:00:04:01:01
//var inPacket9 = Buffer.from([0xa1,0x81,0x15,0x30,0x81,0x12,0x02,0x02,0x10,0xd6,0x02,0x01,0x30,0x30,0x81,0x08,0xa0,0x06,0x04,0x01,0x00,0x04,0x01,0x01]);  //a1:81:15:30:81:12:02:02:10:d6:02:01:30:30:81:08:a0:06:04:01:00:04:01:01
var inPacket9 = Buffer.from([0xa1,0x81,0x15,0x30,0x81,0x12,0x02,0x02,0x3a,0xa4,0x02,0x01,0x30,0x30,0x81,0x08,0xa0,0x06,0x04,0x01,0x00,0x04,0x01,0x01]); 
//var inPacket10 = Buffer.from([0xa2,0x2f,0x30,0x2d,0x02,0x01,0x0f,0x30,0x28,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0xa1,0x1e,0xa0,0x0d,0x04,0x01,0x01,0x04,0x02,0x00,0x0a,0x04,0x04,0x02,0x08,0x0a,0x0a,0xa1,0x0d,0x04,0x01,0x01,0x04,0x02,0x00,0x0a,0x04,0x04,0x03,0x0a,0x03,0x04]); //a2:2f:30:2d:02:01:0f:30:28:a0:06:04:01:01:04:01:01:a1:1e:a0:0d:04:01:01:04:02:00:0a:04:04:04:03:0a:0a:a1:0d:04:01:01:04:02:00:0a:04:04:03:0a:03:04
var inPacket10 = Buffer.from([0xa2,0x2f,0x30,0x2d,0x02,0x01,0x4f,0x30,0x28,0xa0,0x06,0x04,0x01,0x01,0x04,0x01,0x01,0xa1,0x1e,0xa0,0x0d,0x04,0x01,0x01,0x04,0x02,0x00,0x0a,0x04,0x04,0x02,0x08,0x0a,0x0a,0xa1,0x0d,0x04,0x01,0x01,0x04,0x02,0x00,0x0a,0x04,0x04,0x03,0x0a,0x03,0x04]);
//var rawData = buff;
console.log("inPacket5[0]"+inPacket5[0]);
client.on('connect',function(){
  console.log('Connected to server');
  execFunc(outPacket1);
});

function execFunc(data){
  console.log('[execFunc]');
  writingData(data);
}
client.on('data',(data) => {
  console.log('ON DATA');
//  console.log(data);

  // Start comparing and sending data
  if(!(Buffer.compare(data,inPacket1))) // if get Frame 2
  {
    console.log('CASE 1');
    writingData(outPacket2);  //  Send Frame 3
    writingData(outPacket3);  //  Send Frame 4
  }
  if(!(Buffer.compare(data,inPacket2)))  //  if get Frame 5
  {
    console.log('CASE 2');
    writingData(outPacket4);  //  Send Frame 6
  }
  if(!(Buffer.compare(data,inPacket4)))  // if get Frame 8
  {
    console.log('CASE 3');
    writingData(outPacket5);  //  Send Frame 9
  }
  //console.log(data.length);
  if(data.length == 39)//if(data[0]==inPacket5[0])  //else if(!(Buffer.compare(data,inPacket5)))  //  if get Frame 10
  {
    console.log('CASE 4');
    writingData(outPacket6);  //  Send Frame 11
  }
  if(!(Buffer.compare(data,inPacket6)))  //  if get Frame  12
  {console.log('CASE 5');
    writingData(outPacket7);  //  Send Frame 13
  }
  if(!(Buffer.compare(data,inPacket7)))  //  if get Frame 14
  {
    console.log('CASE 6');
    //console.log("We should move to nect step");
    writingData(outPacket8);
  }
  //console.log(data);
  //console.log(data.length);
  if(data[0] == inPacket9[0] &&
    data[1] == inPacket9[1] &&
    data[2] ==  inPacket9[2] &&
    data[3] == inPacket9[3] &&
    data[4] == inPacket9[4])
  {
    console.log('CASE 7');
    writingData(outPacket9);
    writingData(outPacket10);
  }
});
function writingData(data) {
  console.log('[writingData]');
  //console.log(data);
  client.write(data);
}

client.on('end', () => {
  console.log('disconnected from server');
});
