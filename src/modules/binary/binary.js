define([
  "dojo/_base/declare"
  , "main/_RemoteCall"
  , "dojo/Deferred"
  , "dojo/_base/array"
  , "sol/fileName"
  , "sol/promise"
  , "dojo/_base/lang"
  , "main/nameTranslator"
  , "main/modules"
  , "main/serverOnly!server/files"
  , "main/serverOnly!dojo/node!fs"
], function(
  declare
  , _RemoteCall
  , Deferred
  , array
  , fileName
  , solPromise
  , lang
  , nameTranslator
  , modules
  , files
  , fs
){
  var binary;
  
  var Binary = declare("ModuleBinary", [
    _RemoteCall
  ], {
    remoteFunctions: {
      readLinesDef: true
    }
    
    , readLinesDef: function(parName, par){
      var def = new Deferred();
      var name = nameTranslator.fileName(parName);
      
      fs.open(name, "r", function(err, fd){
        if (err){
          def.reject();
          return;
        };
        var count = par.count || 1;
        var size = count * 16;
        var start = par.start || 0;
        start = start * 16;
        var buf = new Buffer(size);
        fs.read(fd, buf, 0, size, start, function(err, bytesRead, buffer){
          if (err){
            def.reject();
            return;
          };
          var res = [];
          for(var l = 0; l < count; ++l){
            var of = l * 16;
            var record = {
              lineNr: start + l
              , data: []
            };
            for (var i = 0; i < 16; ++i){
              record.data[i] = buffer[of + i];
            };
            res.push(record);
          };
          fs.close(fd, function(){
            def.resolve(res);
          });
        });
      });
      
      return def;
    }
    
  });
  binary = new Binary();
  return binary;
});
