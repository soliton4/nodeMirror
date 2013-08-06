/*
  low level dirRead / fileReadWrite implementation
*/
define([
  "dojo/_base/declare"
  , "dojo/_base/array"
  , "dojo/_base/lang"
], function(
  declare
  , Deferred
  , array
  , lang
){
  var fileName;
  var FileName = declare("File", [
    
  ], {
    single: function(parFileName){
      var ar = parFileName.split("/");
      return ar[ar.length - 1];
    }
    , dir: function(parFileName){
      var ar = parFileName.split("/");
      var res = "";
      var i = 0;
      for(i = 0; i < ar.length - 1; ++i){
        res += ar[i];
        res += "/";
      };
      return res;
    }
  });
  fileName = new FileName();
  return fileName;
});
