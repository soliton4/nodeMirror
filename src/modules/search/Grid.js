define([
  "dojo/_base/declare"
  , "dgrid/Grid"
  , "dgrid/extensions/DijitRegistry"
  , "dojo/dom-construct"
  , "dgrid/Selection"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/form/Button"
  , "sol/fileName"
  , "dojo/date/locale"
  , "dojo/dom-class"
  , "dojo/dom-geometry"
  , "sol/convenient/SceduleExec"
  , "dojo/_base/array"
  , "dgrid/extensions/ColumnResizer"
  , "sol/scroll"
  , "dojo/dom-style"
], function(
  declare
  , Grid
  , DijitRegistry
  , domConstruct
  , Selection
  , lang
  , topic
  , Button
  , fileName
  , locale
  , domClass
  , domGeo
  , SceduleExec
  , array
  , ColumnResizer
  , scroll
  , domStyle
){
  var dimensions;
  
  return declare([
    Grid, DijitRegistry, Selection, ColumnResizer
  ], {
    content: {} // will be provided
    , region: "center"
    , showHeader: false
    
    , constructor: function(){
      
    }
    , buildRendering: function(){
      this.inherited(arguments);
    }
    , renderRow: function(object){
      var node;
        
        var div = domConstruct.create("div", {
          "class": "outer2"
        });
        
        var expander = domConstruct.create("div", {
          "class": "expander"
        });
        domConstruct.place(expander, div);
        
        var text = domConstruct.create("div", {
          "class": "text"
        });
        domConstruct.place(text, expander);
        
        var nameNode = document.createTextNode(fileName.single(object.id));
        domConstruct.place(nameNode, text);
        
        var rotator = domConstruct.create("div", {
          "class": "rotator"
        });
        domConstruct.place(rotator, div);
        
        var inner1 = domConstruct.create("div", {
          "class": "inner1"
        });
        domConstruct.place(inner1, rotator);
        
        var nameNode2 = document.createTextNode(fileName.single(object.id));
        domConstruct.place(nameNode2, inner1);
        
        node = div;
      return node;
    }
    
    , resize: function(){
      //debugger;
      var ret = this.inherited(arguments);
      return ret;
    }
    
    , selectionMode: "single"
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      this.doRender();
      this.on(".dgrid-row:click", lang.hitch(this, function(evt){
        var row = this.row(evt);
        topic.publish("client/openid", {
          item: row.data
        });
      }));
    }
    
    , doRender: function(){
      if (!this._started){
        return;
      };
      this.refresh();
      //this.renderArray(this.content.children);
      this.resize();
    }
    
    , isLeftToRight: function(){
      return true;
    }
    , placeAt: function(parNode, par2){
      domConstruct.place(this.domNode, parNode, par2);
    }
  });
  
});
