/*
  handles the transparent server calls
*/
define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/json"
], function(
  declare
  , Deferred
  , json
){
  var RemoteCaller = declare([
  ], {
    classes: {}
	
    //,constructor: function(par){
	//}
	
	, call: function(parDeclaredClass, parFNameStr){
      var data = {
        "declaredClass": parDeclaredClass
		, fName: parFNameStr
		, args: []
      };
      var i = 2;
      while (i < arguments.length){
        data.args.push(arguments[i]);
        ++i;
      };
      var def = new Deferred();
      //console.log("loading request");
      require(["dojo/request/xhr"], function(xhr){
        var webpath = window._nodeMirrorGlobal.webpath; // we need this as global, because the config itself uses apicall
          xhr(webpath + "apicall"
            , {
              data: json.stringify(data)
            , method: "PUT"
            , handleAs: "json"
              , headers: {
                "Content-Type": "application/json"
              }			
          }).then(function(p){ 
            def.resolve(p.result); 
          }, function(p){ 
            def.reject(p); 
          });
      });
      
      return def;
	}
	, add: function(parClass){
      this.classes[parClass.declaredClass] = parClass;
	}
	, serverCall: function(parData){
      var args = [];
      if (parData.args){
        args = parData.args;
      };
      var cls = this.classes[parData.declaredClass];
      var fun = cls[parData.fName];
      return fun.apply(cls, args);
	}
  });
  var remoteCaller = new RemoteCaller({});
  return remoteCaller;
});
