define([
  "dojo/node!fs"
, "dojo/_base/array"
, "dojo/Deferred"
, "dojo/_base/declare"
], function(
  fs
, array
, Deferred
, declare
){
  
  var Counter = declare([], {
    constructor: function(){
      this.count = 0;
    }
    
    , inc: function(){
      this.count++;
    }
    , dec: function(){
      this.count--;
      this._checkCounter();
    }
    
    , then: function(par1, par2){
      if (!this.def){
        this.def = new Deferred();
        this._checkCounter();
      };
      this.def.then(par1, par2);
    }
    
    , _checkCounter: function(){
      if (this.count || !this.def){
        return;
      };
      this.def.resolve();
    }
  });
  
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