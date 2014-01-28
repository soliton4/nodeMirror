define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/string"
  , "main/config"
  , "main/serverOnly!dojo/node!child_process"
  , "main/serverOnly!dojo/node!fs"
], function(
  declare
  , Deferred
  , has
  , array
  , lang
  , solString
  , config
  , child_process
  , fs
){
  
  return {
    
    x11size: function(){
      var def = new Deferred();
      
      config.get("x11terminal").then(function(x11terminal){
        if (!x11terminal){
          def.reject();
          return;
        };
        var spawn  = child_process.spawn;

        var params = [
          "-root", "_NET_DESKTOP_GEOMETRY"
        ];
        
        var xprop = spawn('xprop', params);

        var dataAr = [];
        var stream = xprop.stdout;
        stream.on("data", function(data){
          dataAr.push(data);
        });

        stream.on("end", function(){
          var s = Buffer.concat(dataAr).toString("utf8");
          var ar = s.split("=");
          var value = ar[ar.length - 1];
          ar = value.split(",");
          var y = parseInt(ar.pop(), 10);
          var x = parseInt(ar.pop(), 10);
          def.resolve({ x: x, y: y });
          //def.resolve({ x: 300, y: 150 });
          //res.end();
        });
      });
      return def.promise;
    }
    
  };
  
});
