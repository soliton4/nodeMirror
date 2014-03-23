var child_process = require("child_process");

var stream = require("stream");

var spawn  = child_process.spawn;
var exec = child_process.exec;

var params = [
  "-re",                   // Real time mode
  "-f","x11grab",          // Grab screen
  "-r", "5",              // Framerate
  "-s", "1280x800",   // Capture size

  "-i", ":0+0,0"
];


params.push("-vcodec");
params.push("libx264");

params.push("-tune");
params.push("zerolatency");

params.push("-an");
params.push("-t");
params.push("180"); // 3 min
params.push("-f");
params.push("h264");             // File format

params.push("-");                      // Output to STDOUT

var readable = new stream.Readable();
//var readable = new stream.Readable();

/*avconv = spawn("avconv", params, {
  stdio: [process.stdin, process.stdout, process.stderr]
});*/

/*avconv = spawn("avconv", params, {
  stdio: [process.stdin, readable, process.stderr]
});*/


var child = spawn('avconv', params);

/*child.stdout.on("data", function(){
      console.log("data");
    });*/

var setPullTo;

var pullfun = function(){
  var data = child.stdout.read();
  if (data){
    console.log(data.length);
  }else{
    console.log(0);
  };
  setPullTo();
};

setPullTo = function(){
  setTimeout(pullfun, 100);
};

setPullTo();

child.stdout.on("error", function(){
      console.log("error");
    });
child.stderr.on("data", function(data){
      console.log("stderr data");
    });
child.stderr.on("error", function(){
      console.log("stderr error");
    });

