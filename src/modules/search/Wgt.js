define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "sol/wgt/mixin/resize"
  , "dojo/_base/array"
  , "sol/wgt/Text"
  , "./Grid"
], function(
  declare
  , BorderContainer
  , resizeMixin
  , array
  , Text
  , Grid
){
  
  
  return declare([BorderContainer, resizeMixin], {
    buildRendering: function(){
      this.inherited(arguments);
      this.grid = this.ownObj(new Grid({
        region: "center"
      }));
      this.addChild(this.grid);
    }
    
    , focus: function(){
    }
    
  });
});