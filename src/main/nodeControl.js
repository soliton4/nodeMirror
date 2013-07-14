define([
  "dojo/_base/declare"
  , "main/_RemoteCall"
  , "dojo/Deferred"
  , "main/config"
  , "dojo/_base/array"
  , "sol/promise"
  , "dojo/_base/lang"
], function(
  declare
  , _RemoteCall
  , Deferred
  , config
  , array
  , solPromise
  , lang
){
  var nodeControl;
  var cluster;
  if (config.isServer){
    require(["dojo/node!cluster"], function(parCluster){
      cluster = parCluster;
    });
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
        cluster.worker.kill();
      }, 10);
      def.resolve({});
      return def.promise;
    }
    
  });
  nodeControl = new NodeControl();
  return nodeControl;
});
