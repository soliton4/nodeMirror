define([
  "dojo/_base/declare"
  , "modules/Base"
  , "dojo/Deferred"
], function(
  declare
  , Base
  , Deferred
){
  return declare([Base], {
    getContent: function(par){
      var def = new Deferred();
      def.resolve({});
      return def;
    }
    
  });
});
