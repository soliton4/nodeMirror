(function(){
  var defineFun;
  var requireFun;
  
  if (typeof exports == "object" && typeof module == "object"){ // CommonJS
    requireFun = function(modulesAr, callback, errBack){
      try{
        var i = 0;
        var l = modulesAr.length;
        var args = [];
        for (i; i < l; ++i){
          args.push(require(modulesAr[i]));
        };
      }catch(e){
        errBack(e);
        return;
      };
      callback.apply(callback, args);
    };
    defineFun = function(requireAr, callback){
      requireFun(requireAr, function(){
        module.exports = callback.apply(callback, arguments);
      });
    };
    
  }else if (typeof define == "function" && define.amd){ // AMD
    var _define = define;
    requireFun = require;
    
    defineFun = function(par1, par2){
      if (par1 instanceof Array){
        par1.unshift("require");
      }else{
        par2 = par1;
        par1 = ["require"];
      };
      _define(par1, function(){
        requireFun = arguments[0];
        var args = [];
        for (var i = 1; i < arguments.length; ++i){
          args.push(arguments[i]);
        };
        return par2.apply(par2, args);
      });
    };
    
  }else{ // Plain browser env
    alert("not working out!");
    
  };
  defineFun([], function(){
var __execute = function(promiseland, extra){ __execute = undefined; var __require = requireFun;

if (promiseland._hasModule({ hashStr: "757012e88c172983336904631adc49f4" })){ return promiseland._getModule("757012e88c172983336904631adc49f4"); };
var PL$1 = (function(){
"use strict";

  ;
  ;
  return {
    "accessNotAllowd": {
      "id": 200,
      "msg": "access to member not allowed"
    },
    "typeMissmatch": {
      "id": 201,
      "msg": "type missmatch"
    },
    "missingVariable": {
      "id": 202,
      "msg": "variable missing"
    },
    "operatorMissmatch": {
      "id": 203,
      "msg": "operator missmatch"
    },
    "expectedCallable": {
      "id": 204,
      "msg": "expected callable expression"
    },
    "noConstructorAvailable": {
      "id": 205,
      "msg": "no Constructor available"
    },
    "connectNotPossible": {
      "id": 206,
      "msg": "connect not possible"
    },
    "trackedProvisionalNotImplemented": {
      "id": 207,
      "msg": "tracked provisional type feature is not implemented"
    },
    "onlyTrackedClassesCanContainTrackedMembers": {
      "id": 208,
      "msg": "only tracked classes can contain tracked members"
    },
    "notAPromise": {
      "id": 209,
      "msg": "type is not a promise"
    },
    "notASyncableResponse": {
      "id": 210,
      "msg": "not a syncable response"
    },
    "notSyncable": {
      "id": 211,
      "msg": "not syncable"
    },
    "unknownInstanceType": {
      "id": 212,
      "msg": "unknown instance type"
    },
    "idNotAllowedInUnique": {
      "id": 213,
      "msg": "definition of id is not allowed in unique classes"
    },
    "onlyUniqueCanBeStringified": {
      "id": 214,
      "msg": "only unique classes can be stringified"
    },
    "missingRemoteFun": {
      "id": 801,
      "msg": "remote function not registred"
    },
    "frameNotAvailable": {
      "id": 802,
      "msg": "requested frame not available"
    },
    "frameNotFound": {
      "id": 803,
      "msg": "requested frame not found"
    },
    "noSyncableData": {
      "id": 804,
      "msg": "no syncable Data"
    },
    "invalidRemoteType": {
      "id": 805,
      "msg": "invalid remote type"
    },
    "remoteTypeNotAvailable": {
      "id": 806,
      "msg": "remote type not available"
    },
    "canNotExecute": {
      "id": 807,
      "msg": "can not execute",
      "additional": "this might have one of several reasons"
    },
    "takeOverDuplicate": {
      "id": 809,
      "msg": "internal: take over duplicate"
    },
    "missingImplementation": {
      "id": 810,
      "msg": "internal: missing implementation"
    },
    "frameExists": {
      "id": 811,
      "msg": "a frame with this name already exists"
    },
    "toManyConnections": {
      "id": 812,
      "msg": "to many connections"
    },
    "noConnectionAvailable": {
      "id": 813,
      "msg": "no connection available"
    }
  };
  ;})();
;return PL$1;
}; return function(){ return __execute.apply(null, arguments); } });
})();