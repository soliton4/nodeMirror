/*
  base class for singletons that allow a defined set of functions to be executed at the server
*/
define([
  "dojo/_base/declare"
  , "main/config"
  , "main/remoteCaller"
  , "dojo/_base/lang"
], function(
  declare
  , config
  , remoteCaller
  , lang
){
  var classNameStr = "_RemoteCall";
  var _Base = declare(classNameStr, [
  ], {
    constructor: function(par){
      remoteCaller.add(this);
      if (config.isServer){
        // nothing to do
		return;
      };
      var fNameStr;
      for(fNameStr in this.remoteFunctions){
        if (this.remoteFunctions[fNameStr] && typeof this[fNameStr] == "function"){
          var m = {};
          m[fNameStr] = lang.hitch(remoteCaller, "call", this.declaredClass, fNameStr);
          declare.safeMixin(this, m);
		};
      };
	}
	, remoteFunctions: {
      // exampleFunctionName: true
	}
	
  });
  return _Base;
});
