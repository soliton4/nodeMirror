
var im = require("imagemagick");

var options = {
  srcPath: "/home/sol/projects/nodeMirror/src/image/logoBig.png",
  //dstPath: "/home/sol/projects/nodeMirror/src/test/test2.jpg",
  format: 'png',
  width: 100,
  height: 100
};

var fs = require("fs");

im.resize(options, function(err, stdout, stderr){
  console.log(err);
  console.log(stdout);
  //fs.writeFileSync('kittens-resized.jpg', stdout, 'binary');
  var buf = new Buffer(stdout, 'binary');
  console.log(buf.toString("base64"));
  fs.writeFile("base64res.png", buf);
  fs.writeFile("base64res.html", buf.toString("base64"));
});


