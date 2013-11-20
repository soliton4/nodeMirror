define([
  "dojo/node!fs"
, "dojo/_base/array"
, "dojo/Deferred"
, "dojo/_base/declare"
, "sol/promise/Counter"
], function(
  fs
, array
, Deferred
, declare
, Counter
){
  
  var walk = function(dirName, counter, fun){
    counter.inc();
    fs.readdir(dirName, function(err, parFiles){
      if (err){
        console.log("dir err: " + dirName);
        console.log(err);
        counter.dec();
        return;
      };
      
      array.forEach(parFiles, function(file){
        counter.inc();
        fs.stat(dirName + "/" + file, function(err, stats){
          if (err){
            console.log("stat err: " + dirName);
            console.log(err);
            counter.dec();
            return;
          };
          if (stats.isDirectory()){
            walk(dirName + "/" + file, counter, fun);
          };
          fun({
            stats: stats
            , filename: dirName + "/" + file
          });
          counter.dec();
        });
      });
      
      counter.dec();
    });
  };
  
  var fileWalker = {
    /* 
      walk(<dirname>, {
        fileFun: <function to be called for each file>
      })
    */
    walk: function(parDirName, par){
      var def = new Deferred();
      var counter = new Counter();
      walk(parDirName, counter, par.fileFun);
      counter.then(function(){
        def.resolve();
      });
      return def.promise;
    }
  };
  return fileWalker;
});