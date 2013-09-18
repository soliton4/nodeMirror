// try a rendering that will not be seen on the screen

define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "dojo/dom-style"
  , "dojo/dom-construct"
  , "dojo/dom-geometry"
  , "dojo/dom-class"
], function(
  declare
  , _WidgetBase
  , domStyle
  , domConstruct
  , domGeo
  , domClass
){
  
  return declare([_WidgetBase], {
    buildRendering: function(){
      this.inherited(arguments);
      domStyle.set(this.domNode, {
        opacity: 0
        , position: "absolute"
        , height: "0px"
        , width: "0px"
        , overflow: "hidden"
        , top: "-100"
        , left: "-100"
      });
      this.containerNode = domConstruct.create("div", {
        style:{
          opacity: 0
          , position: "absolute"
          , height: "0px"
          , width: "0px"
          , overflow: "hidden"
          , top: "-100"
          , left: "-100"
        }
      });
      domConstruct.place(this.containerNode, this.domNode);
      this.tryNode = this.containerNode;
    }
    
    , getMarginBox: function(par){
      if (par["class"]){
        domClass.add(this.tryNode, par["class"]);
      };
      domConstruct.place(par.node, this.containerNode);
      var box = domGeo.getMarginBox(par.node);
      this.containerNode.removeChild(par.node);
      if (par["class"]){
        domClass.remove(this.tryNode, par["class"]);
      };
      return box;
    }
  });
  
});