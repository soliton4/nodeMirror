/*
  base class for singletons that allow a defined set of functions to be executed at the server
*/
define([
  "dojo/_base/declare"
  , "dojo/has"
  , "main/remoteCaller"
  , "dojo/_base/lang"
], function(
  declare
  , has
  , remoteCaller
  , lang
){
  var classNameStr = "_RemoteCall";
  var _Base = declare(classNameStr, [
  ], {
    constructor: function(par){
      remoteCaller.add(this);
      if (has("server-modules")){
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
