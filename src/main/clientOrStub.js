define([
  "dojo/has"
  , "dojo/_base/declare"
],function(
  has
  , declare
){
  var stub = declare([], {});
  return {
    load: function(id, require, load){
      if (!has("server-modules")){
        require([id], load);
      }else{
        load(stub);
      };
    }
  };
});
