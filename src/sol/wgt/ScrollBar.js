define([
  "dojo/_base/declare"
, "dijit/_WidgetBase"
, "dojo/dom-construct"
], function(
  declare
, _WidgetBase
, domConstruct
){
  return declare([_WidgetBase], {
    "class": "solWgt scrollBar"
    , buildRendering: function(){
      this.inherited(arguments);
      this.grabNode = domConstruct.create("div", {
        "class": "grabNode"
      });
      domConstruct.place(this.grabNode, this.domNode);
    }
  });
});