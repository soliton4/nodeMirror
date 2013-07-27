define([
  "./meta"
  , "dojo/_base/array"
], function(
  meta
  , array
){
  var subtypes = {};
  array.forEach(meta, function(info){
    subtypes[info.mime.split("/")[1]] = true;
  });
  return subtypes;
});