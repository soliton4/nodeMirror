define([
  "dojo/_base/declare"
  , "main/_RemoteCall"
  , "dojo/Deferred"
  , "main/config!node-mirror"
  , "dojo/_base/array"
  , "sol/promise"
  , "dojo/_base/lang"
  , "dojo/has"
], function(
  declare
  , _RemoteCall
  , Deferred
  , config
  , array
  , solPromise
  , lang
  , has
){
  var nodeControl;
  var cluster;
  if (has("server-modules")){
    //console.log("running on server");
    if (config.restartableObj){
      console.log("has restartable");
    };
  };
  
  var NodeControl = declare("NodeControl", [
    _RemoteCall
  ], {
    remoteFunctions: {
      restartDef: true
    }
    
    , restartDef: function(){
      var def = new Deferred();
      setTimeout(function(){
        if (config.restartableObj && config.restartableObj.isRestartable){
          config.restartableObj.restart();
        };
      }, 10);
      def.resolve({});
      return def.promise;
    }
    
  });
  nodeControl = new NodeControl();
  return nodeControl;
});
