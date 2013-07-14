/*
  handles the transparent server calls
*/
define([
  "dojo/_base/declare"
  , "main/config"
  , "dojo/Deferred"
  , "dojo/json"
], function(
  declare
  , config
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
	  console.log("loading request");
	  require(["dojo/request/xhr"], function(xhr){
	    xhr("/apicall"
		  , {
		    data: json.stringify(data)
			, method: "PUT"
			, handleAs: "json"
            , headers: {
              "Content-Type": "application/json"
              //, "Content-Encoding": "ISO-8859-1"
              //, "X-Method-Override": "FANCY-GET"
            }			
		}).then(function(p){def.resolve(p)}, function(p){def.reject(p)});
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
