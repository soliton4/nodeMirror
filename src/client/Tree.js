define([
  "dojo/_base/declare"
  , "dijit/Tree"
  , "client/tree/Model"
], function(
  declare
  , Tree
  , Model
){
  return declare([
    Tree
  ], {
    constructor: function(){
	  this.model = new Model();
	}
    , postMixinProperties: function(){
	  alert("hi");
	}
  });
});
