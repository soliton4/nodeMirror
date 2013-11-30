define([
  "dojo/_base/declare"
  , "sol/wgt/Tree"
  , "./Model"
  , "client/globals"
  , "dojo/_base/lang"
  , "dojo/on"
  , "dojo/dom-geometry"
  , "dojo/dom-style"
  , "dojo/dom-class"
  , "dojo/dom-construct"
  , "dojo/_base/fx"
], function(
  declare
  , Tree
  , Model
  , globals
  , lang
  , on
  , domGeo
  , domStyle
  , domClass
  , domConstruct
  , fx
){
  
  return declare([
    Tree
  ], {
    
    constructor: function(){
      this.model = new Model();
	}
    , region: "center"
    
    , buildRendering: function(){
      var self = this;
      this.inherited(arguments);
    }
    
    , onClick: function(item, node, evt){
      globals.openItem(item);
    }
    
    , destroy: function(){
      this.inherited(arguments);
    }
    
  });
});
