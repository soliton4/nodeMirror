var cp = require("child_process");

var fs = require("fs");

var spawn  = cp.spawn;

var params = [
  '-window', 'root', 'png:-'
  ];

var ip = spawn('import', params);

var base64Str = "";
var buffersAr = [];
var stream = ip.stdout;

stream.on("data", function(data){
  buffersAr.push(data);
});
stream.on("end", function(data){
  fs.writeFile("screengrab", Buffer.concat(buffersAr));
});
