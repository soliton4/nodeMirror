define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
], function(
  declare
  , _WidgetBase
  , domConstruct
  , lang
){
  return declare([_WidgetBase], {
    tagName: "span"
    , tagAttributes: {}
    , buildRendering: function(){
      var attributes = lang.mixin({}, this.tagAttributes);
      if (this["class"]){
        attributes["class"] = this["class"];
      };
      if (this.style){
        attributes.style = this.style;
      };
      /*if (this.text){
        attributes.textContent = this.text;
      };*/
      this.domNode = domConstruct.create(this.tagName, this.tagAttributes);
      this.textNode = document.createTextNode(this.text);
      domConstruct.place(this.textNode, this.domNode);
    }
    
    , _setTextAttr: function(parText){
      if (this.textNode){
        domConstruct.destroy(this.textNode);
        this.textNode = document.createTextNode(this.text);
        domConstruct.place(this.textNode, this.domNode);
      };
    }
    
  });
});