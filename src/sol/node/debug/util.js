define([
  "dojo/_base/declare"
  , "dojo/json"
  , "dojo/Deferred"
  , "dojo/_base/lang"
  , "dojo/_base/array"
], function(
  declare
  , json
  , Deferred
  , lang
  , array
){
  return {
    dereference: function(parObj, parReferenceAr){
      var helpObj = {};
      array.forEach(parReferenceAr, function(obj){
        helpObj[obj.handle] = obj;
      });
      
      var handleFun = function(refObj){
        if (typeof refObj == "object"){
          if (refObj.ref !== undefined){
            return helpObj[refObj.ref];
          };
        }else if(typeof refObj == "array"){
          return array.map(refObj, function(obj){
            return handleFun(obj) || obj;
          });
        };
        return refObj;
      };
      
      for (var member in parObj){
        parObj[member] = handleFun(parObj[member]);
      };
      return parObj;
    }
    , _dereference: function(parObj, parReferenceObj){
      var helpObj = {};
    }
  };
  
});
