define([
  "dojo/_base/declare"
, "dojo/_base/lang"
, "dojo/dom-construct"
, "dijit/_WidgetBase"
], function(
  declare
  , lang
  , domConstruct
  , _WidgetBase
){
  return declare([_WidgetBase], {
    tagName: "div"
    , buildRendering: function(){
      this.domNode = domConstruct.create(this.tagName, this.tagAttributes);
      return this.inherited(arguments);
    }
  });
});
