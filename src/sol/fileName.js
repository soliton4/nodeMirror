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
  });
  fileName = new FileName();
  return fileName;
});
