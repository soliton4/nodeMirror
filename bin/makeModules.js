modulizer = require("modulize-generic-js");

// codemirror

srcPath = __dirname + "/../generic-js/CodeMirror/";
destPath = __dirname + "/../src/codemirror/";

var errFun = function(err){
  if (err){
    console.log(err);
  };
};

modulizer.convertFile(srcPath + "lib/codemirror.js", {
  "return": "CodeMirror"
}, destPath + "CodeMirror.js", errFun);

var standardConfig = {
  require: [{
    module: "codemirror/CodeMirror"
    , as: "CodeMirror"
  }]
  , "return": "CodeMirror"
};

modulizer.convertFile(srcPath + "mode/xml/xml.js", standardConfig, destPath + "mode/xml.js", errFun);
modulizer.convertFile(srcPath + "mode/javascript/javascript.js", standardConfig, destPath + "mode/javascript.js", errFun);
modulizer.convertFile(srcPath + "mode/css/css.js", standardConfig, destPath + "mode/css.js", errFun);
modulizer.convertFile(srcPath + "mode/vbscript/vbscript.js", standardConfig, destPath + "mode/vbscript.js", errFun);
modulizer.convertFile(srcPath + "mode/htmlmixed/htmlmixed.js", standardConfig, destPath + "mode/htmlmixed.js", errFun);

modulizer.convertFile(srcPath + "addon/dialog/dialog.js", standardConfig, destPath + "addon/dialog.js", errFun);
modulizer.convertFile(srcPath + "addon/search/searchcursor.js", standardConfig, destPath + "addon/searchcursor.js", errFun);
modulizer.convertFile(srcPath + "addon/search/search.js", standardConfig, destPath + "addon/search.js", errFun);


srcPath = __dirname + "/../generic-js/CodeMirror/";
destPath = __dirname + "/../src/codemirror/";


//  jshint

srcPath = __dirname + "/../generic-js/jshint/";
destPath = __dirname + "/../src/jshint/";

modulizer.convertFile(srcPath + "jshint-2.1.4.js", {
  "return": "JSHINT"
}, destPath + "jshint.js", errFun);

// PEG.js
srcPath = __dirname + "/../generic-js/peg/";
destPath = __dirname + "/../src/peg/";

modulizer.convertFile(srcPath + "PEG.js", {
  "return": "PEG"
}, destPath + "Peg.js", errFun);
