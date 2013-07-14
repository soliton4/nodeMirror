define([
  "dojo/_base/declare"
  , "dojo/_base/config"
], function(
  declare
  , dojoConfig
){
  var ConfigCls = declare([
  ], {
    __dirname: dojoConfig.__dirname
    
    , constructor: function(par){
	  declare.safeMixin(this, par);
	}
  });
  var config = new ConfigCls();
  return config;
});
