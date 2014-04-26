define([
  "dojo/node!modulize-generic-js"
  , "dojo/node!fs"
  , "dojo/_base/config"
  , "dojo/_base/array"
  , "dojo/Deferred"
  , "sol/string"
  , "sol/promise"
  , "dojo/_base/lang"
  , "sol/fileName"
], function(
  modulizer
  , fs
  , dojoConfig
  , array
  , Deferred
  , solString
  , solPromise
  , lang
  , fileName
){
  
  var genericDir = dojoConfig.baseUrl + "../generic-js/";
  var srcDir = dojoConfig.baseUrl;
  
  // codemirror
  
  
  srcPath = genericDir + "CodeMirror/";
  destPath = srcDir + "codemirror/";

var errFun = function(err){
  if (err){
    console.log(err);
  };
};
  
  
  modulizer.convertFile(srcPath + "lib/codemirror.js", {
    "return": "CodeMirror"
  }, destPath + "CodeMirror.js", errFun);

  modulizer.convertFile(srcPath + "mode/meta.js", {
    require: [{
      module: "codemirror/CodeMirror"
      , as: "CodeMirror"
    }]
    , "return": "CodeMirror.modeInfo"
  }, destPath + "modeMeta.js", errFun);
  
  modulizer.convertFile(srcPath + "mode/meta.js", {
    require: [{
      module: "main/codemirror/fake"
      , as: "CodeMirror"
    }]
    , "return": "CodeMirror.modeInfo"
  }, srcDir + "main/codemirror/meta.js", errFun);
  
  
  fs.readFile(srcPath + "lib/codemirror.css", function(err, data){
    if (err){
      console.log(err);
      return;
    };
    fs.writeFile(destPath + "codemirror.css", data, function(err){
      console.log(destPath + "codemirror.css");
      if (err){
        console.log(err);
      };
    });
  });

var standardConfig = {
  require: [{
    module: "codemirror/CodeMirror"
    , as: "CodeMirror"
  }]
  , "return": "CodeMirror"
};
  var codemirrorStandardRequire = {
    module: "codemirror/CodeMirror"
    , as: "CodeMirror"
  };
  
  var codemirrorExtraConfig = {
    "coffeescript-lint.js": {
      require: [codemirrorStandardRequire, {
        module: "codemirror/lint/coffeelint"
        , as: "coffeelint"
      }]
      , "return": "CodeMirror"
    }
    
    , "css-lint.js": {
      require: [codemirrorStandardRequire, {
        module: "codemirror/lint/csslint"
        , as: "CSSLint"
      }]
      , "return": "CodeMirror"
    }
    
    , "javascript-lint.js": {
      require: [codemirrorStandardRequire, {
        module: "jshint/jshint"
        , as: "JSHINT"
      }]
      , "return": "CodeMirror"
    }
    
    , "json-lint.js": {
      require: [codemirrorStandardRequire, {
        module: "codemirror/lint/jsonlint"
        , as: "jsonlint"
      }]
      , "return": "CodeMirror"
    }
  };
  
  var getConfig = function(parFilenameStr){
    var fn = fileName.single(parFilenameStr);
    if (codemirrorExtraConfig[fn]){
      return codemirrorExtraConfig[fn];
    }else{
      return standardConfig;
    };
  };

  var modeDir = srcPath + "mode";
  var modeDestDir = destPath + "mode";
  
  var del = new Deferred();
  
  // delete all in mode dir
  fs.readdir(modeDestDir, function(err, data){
    if (err){
      console.log(err);
      return;
    };
    var defs = [];
    array.forEach(data, function(parFileName){
      if (solString.endsWith(parFileName, ".js")){
        var def = new Deferred();
        defs.push(def);
        fs.unlink(modeDestDir + "/" + parFileName, function(){
          def.resolve();
        });
      };
    });
    if (defs.length){
      solPromise.allDone(defs).then(function(){
        del.resolve();
      });
    }else{
      del.resolve();
    };
  });
  
  var allModesStr = "define([\"codemirror/CodeMirror\"";
  
  del.then(function(){
    
    fs.readdir(modeDir, function(err, data){
      if (err){
        console.log(err);
        return;
      };
      var defs = [];
      array.forEach(data, function(parDirName){
        var def = new Deferred();
        defs.push(def);
        fs.stat(modeDir + "/" + parDirName, function(err, parStat){
          if (err){
            console.log(err);
            def.resolve();
            return;
          };
          if (parStat.isDirectory()){
            var srcFile = modeDir + "/" + parDirName + "/" + parDirName + ".js";
            fs.exists(srcFile, function (exists) {
              if (!exists){
                def.resolve();
                return;
              };
              allModesStr += ", \"codemirror/mode/" + parDirName + "\"";
              modulizer.convertFile(srcFile, getConfig(srcFile), modeDestDir + "/" + parDirName + ".js", errFun);
              def.resolve();
            });
          }else{
            def.resolve();
          };
        });
      });
      solPromise.allDone(defs).then(function(){
        allModesStr += "], function(CodeMirror){ return CodeMirror; });";
        fs.writeFile(modeDestDir + "/allModes.js", allModesStr);
      });
    });
  });
  
  var srcAddOnDir = srcPath + "addon/";
  var destAddOnDir = destPath + "addon/";
  
  var cssAddOns = "";
  var walkDefs = [];
  
  var walk;
  
  // recursively walk through the addon dir
  walk = function(parDir){
    var completeSrc = srcAddOnDir + parDir;
    var completeDest = destAddOnDir + parDir;
    var mainDef = new Deferred();
    
    fs.readdir(completeSrc, function(err, data){
      if (err){
        console.log(err);
        return;
      };
      var waitDefs = [];
      array.forEach(data, function(parFile){
        var def = new Deferred();
        waitDefs.push(def);
        fs.stat(completeSrc + parFile, function(err, stat){
          if(err){
            console.log(err);
            return;
          };
          if (stat.isDirectory()){
            fs.mkdir(completeDest + parFile, null, function(err){
              if (err){
                if (err.errno != 47){
                  console.log(err);
                  return;
                };
              };
              walk(parDir + parFile + "/").then(function(){
                def.resolve();
              });
            });
          }else{
            if (solString.endsWith(parFile, ".js")){
              modulizer.convertFile(completeSrc + parFile, getConfig(parFile), completeDest + parFile, errFun);
              def.resolve();
            }else if (solString.endsWith(parFile, ".css")){
              cssAddOns += "@import url(\"" + parDir + parFile + "\");\n";
              fs.readFile(completeSrc + parFile, function(err, data){
                def.resolve();
                if (err){
                  console.log(err);
                  return;
                };
                fs.writeFile(completeDest + parFile, data);
              });
            }else{
              def.resolve();
            };
          };
        });
      });
      solPromise.allDone(waitDefs).then(function(){
        mainDef.resolve();
      });
    });
    return mainDef;
  };
  walk("").then(function(){
    fs.writeFile(destAddOnDir + "all.css", cssAddOns);
  });
  
  var allThemesStr = "";
  var allThemesJsStr = "define([], function(){ return [\"default\", ";
  var allThemesJsStarted = false;
  
  var srcThemeDir = srcPath + "theme/";
  var destThemeDir = destPath + "theme/";
  fs.mkdir(destThemeDir, null, function(err){
    if (err){
      if (err.errno != 47){
        console.log(err);
        return;
      };
    };
    fs.readdir(srcThemeDir, function(err, data){
      if (err){
        console.log(err);
        return;
      };
      array.forEach(data, function(parFile){
        if (parFile == "ambiance-mobile.css"){
          return;
        };
        if (solString.endsWith(parFile, ".css")){
          allThemesStr += "@import url(\"" + parFile + "\");\n";
          if (allThemesJsStarted){
            allThemesJsStr += ", ";
          };
          allThemesJsStr += "\"" + solString.cutEnd(parFile, 4) + "\"";
          allThemesJsStarted = true;
          fs.readFile(srcThemeDir + parFile, function(err, data){
            if (err){
              console.log(err);
              return;
            };
            fs.writeFile(destThemeDir + parFile, data);
          });
        };
      });
      fs.writeFile(destThemeDir + "all.css", allThemesStr);
      allThemesJsStr += "]; });";
      fs.writeFile(destThemeDir + "all.js", allThemesJsStr);
    });
  });
  
// keymaps
  
  
modulizer.convertFile(genericDir + "CodeMirror/keymap/extra.js", standardConfig
                      , srcDir + "codemirror/keymap/extra.js", errFun);

modulizer.convertFile(genericDir + "CodeMirror/keymap/emacs.js", standardConfig
                      , srcDir + "codemirror/keymap/emacs.js", errFun);

  modulizer.convertFile(genericDir + "CodeMirror/keymap/vim.js", standardConfig
                      , srcDir + "codemirror/keymap/vim.js", errFun);
  
  
  
  
  // hints
  
  
  
  var allHintsJsStr = "define([\"codemirror/CodeMirror\"";
  var allHintsArStr = "[";
  //var allHintsJsStr = "define([], function(){ return [";
  var allHintsJsStarted = false;
  
  var srcHintDir = srcPath + "addon/hint/";
  var destHintDir = destPath + "addon/hint/";
  fs.mkdir(destHintDir, null, function(err){
    if (err){
      if (err.errno != 47){
        console.log(err);
        return;
      };
    };
    fs.readdir(srcHintDir, function(err, data){
      if (err){
        console.log(err);
        return;
      };
      array.forEach(data, function(parFile){
        if (solString.endsWith(parFile, ".js")){
          //allThemesStr += "@import url(\"" + parFile + "\");\n";
          if (allHintsJsStarted){
            allHintsArStr += ", ";
          };
          allHintsArStr += "\"" + solString.cutEnd(parFile, 3) + "\"";
          allHintsJsStr += ", \"codemirror/addon/hint/";
          allHintsJsStr += solString.cutEnd(parFile, 3);
          allHintsJsStr += "\"";
          
          allHintsJsStarted = true;
          fs.readFile(srcHintDir + parFile, function(err, data){
            if (err){
              console.log(err);
              return;
            };
            fs.writeFile(destHintDir + parFile, data);
          });
        };
      });
      allHintsArStr += "]";
      allHintsJsStr += "], function(){ return ";
      allHintsJsStr += allHintsArStr;
      allHintsJsStr += "; });";
      fs.writeFile(destHintDir + "all.js", allHintsJsStr);
    });
  });


  
  // lint
  
  
  
  var allLintsJsStr = "define([\"codemirror/CodeMirror\"";
  var allLintsArStr = "[";
  var allLintsJsStarted = false;
  
  var srcLintDir = srcPath + "addon/lint/";
  var destLintDir = destPath + "addon/lint/";
  fs.mkdir(destLintDir, null, function(err){
    if (err){
      if (err.errno != 47){
        console.log(err);
        return;
      };
    };
    fs.readdir(srcLintDir, function(err, data){
      if (err){
        console.log(err);
        return;
      };
      array.forEach(data, function(parFile){
        if (solString.endsWith(parFile, ".js")){
          
          if (parFile != "coffeescript-lint.js"){
            if (allLintsJsStarted){
              allLintsArStr += ", ";
            };
            allLintsArStr += "\"" + solString.cutEnd(parFile, 3) + "\"";
            allLintsJsStr += ", \"codemirror/addon/lint/";
            allLintsJsStr += solString.cutEnd(parFile, 3);
            allLintsJsStr += "\"";
          };
          
          allLintsJsStarted = true;
          fs.readFile(srcLintDir + parFile, function(err, data){
            if (err){
              console.log(err);
              return;
            };
            fs.writeFile(destLintDir + parFile, data);
          });
        };
      });
      allLintsArStr += "]";
      allLintsJsStr += "], function(){ return ";
      allLintsJsStr += allLintsArStr;
      allLintsJsStr += "; });";
      fs.writeFile(destLintDir + "all.js", allLintsJsStr);
    });
  });

  
  
//  coffeelint

modulizer.convertFile(genericDir + "coffeelint/coffeelint.js", {
  "return": "module.exports"
}, srcDir + "codemirror/lint/coffeelint.js", errFun);


// csslint
  
modulizer.convertFile(genericDir + "csslint/release/csslint.js", {
  "return": "CSSLint"
}, srcDir + "codemirror/lint/csslint.js", errFun);
  
  
//  jshint

modulizer.convertFile(genericDir + "jshint/jshint-2.1.4.js", {
  "return": "JSHINT"
}, srcDir + "codemirror/lint/jshint.js", errFun);

  
jshintSrcPath = genericDir + "jshint/";
jshintDestPath = srcDir + "jshint/";

modulizer.convertFile(jshintSrcPath + "jshint-2.1.4.js", {
  "return": "JSHINT"
}, jshintDestPath + "jshint.js", errFun);

  
  // jsonlint
  
modulizer.convertFile(genericDir + "jsonlint/lib/jsonlint.js", {
  "return": "jsonlint"
}, srcDir + "codemirror/lint/jsonlint.js", errFun);
  
  
// PEG.js
var pegSrcPath = genericDir + "peg/";
var pegDestPath = srcDir + "peg/";

modulizer.convertFile(pegSrcPath + "PEG.js", {
  "return": "PEG"
}, pegDestPath + "Peg.js", errFun);

/*    
// avc
var avcSrcPath = genericDir + "Broadway/Player/";
var avcDestPath = srcDir + "avc/";

modulizer.convertFile(avcSrcPath + "util.js", {
  "returnmultiple": {
    "assert": true
    , "text": true
    , "inherit": true
  }
}, avcDestPath + "util.js", errFun);
    
modulizer.convertFile(avcSrcPath + "glUtils.js", {
  require: [{
    "module": "avc/sylvester"
    , "as": "_sylvester"
    , "members": ["Matrix", "Vector", "$M"]
  }]  
  , "returnmultiple": {
    "makePerspective": true
  }
}, avcDestPath + "glUtils.js", errFun);
    
modulizer.convertFile(avcSrcPath + "sylvester.js", {
  "returnmultiple": {
    "Matrix": true,
    "Vector": true,
    "$M": true,
    "$V": true
  }
}, avcDestPath + "sylvester.js", errFun);
    

modulizer.convertFile(avcSrcPath + "avc-codec.js", {
  "return": "Module"
  , replace: [{
    find: /;(?=([^"\\]*(\\.|"([^"\\]*\\.)*[^"\\]*"))*[^"]*$)/g
    , replace: ";\n"
  }]
}, avcDestPath + "avc-codec.js", errFun);

modulizer.convertFile(avcSrcPath + "avc.js", {
  require: [{
    "module": "avc/avc-codec"
    , "as": "Module"
  }, {
    "module": "avc/util"
    , "as": "_util"
    , "members": ["assert"]
  }]  
  , "return": "Avc"
}, avcDestPath + "Avc.js", errFun);

modulizer.convertFile(avcSrcPath + "canvas.js", {
  require: [{
    "module": "avc/util"
    , "as": "_util"
    , "members": ["assert", "text", "inherit"]
  }, {
    "module": "avc/glUtils"
    , "as": "_glUtils"
    , "members": ["makePerspective"]
  }, {
    "module": "avc/sylvester"
    , "as": "_sylvester"
    , "members": ["Matrix", "$V"]
  }]  
  , "returnmultiple": {
    "YUVWebGLCanvas": true
  }
}, avcDestPath + "canvas.js", errFun);
    
    var fileReadOptions = {encoding: "utf8"};
    fs.readFile(avcSrcPath + "util.js", fileReadOptions, function(err, utiljs){
      fs.readFile(avcSrcPath + "avc-codec.js", fileReadOptions, function(err, avcCodecjs){
        fs.readFile(avcSrcPath + "avc.js", fileReadOptions, function(err, avcjs){
          fs.readFile(avcDestPath + "workerTemplate.js", fileReadOptions, function(err, workerTemplatejs){
            var js = "importScripts('workerutil.js');\nimportScripts('workeravccodec.js');\n" + avcjs + "\n" + workerTemplatejs;
            fs.writeFile(avcDestPath + "workerutil.js", utiljs);
            fs.writeFile(avcDestPath + "workeravccodec.js", avcCodecjs);
            fs.writeFile(avcDestPath + "worker.js", js);
          });
        });
      });
    });
    
  */
    
});
    