define([
  "dojo/_base/declare"
  , "dijit/layout/ContentPane"
], function(
  declare
  , ContentPane
){
  return declare([ContentPane], {
    buildRendering: function(){
      this.inherited(arguments);
    }
  });
});
