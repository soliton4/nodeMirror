define([
  "dojo/_base/declare"
  , "main/config"
  , "dojo/dom-class"
  , "sol/wgt/mixin/noDomTitle"
  , "dojo/_base/lang"
  , "dojox/html/entities"
], function(
  declare
  , config
  , domClass
  , noDomTitleMixin
  , lang
  , entities
){
  var contentTabs;
  require([
    "main/moduleLoader!client"
  ], function(
    moduleLoader
  ){
    contentTabs = moduleLoader.getModule("modules/ContentTabs");
  });

  
  return declare([noDomTitleMixin], {
    closable: true
    
    , buildRendering: function(){
      this.own(this.watch("dirty", lang.hitch(this, "_doTitle")));
      this.inherited(arguments);
      domClass.add(this.domNode, "contentTab");
    }
    
    , _doTitle: function(){
      this._set("title", entities.encode(this._simpleTitle + this._getDirtyPart()));
      if (contentTabs){
        contentTabs.resize();
      };
    }
    
    /*, _getTitleAttr: function(){
      if (this.title && this.title.length > 24){
        return this.title.substr(0, 21) + "...";
      };
      return this.title;
    }*/
    , _setTitleAttr: function(title){
      
      this._simpleTitle = title;
      this._completeTitle = title;
      if (this._simpleTitle && this._simpleTitle.length > 24){
        this._simpleTitle = this._simpleTitle.substr(0, 21) + "...";
      };
      this._doTitle();
    }
    , _getDirtyPart: function(){
      if (this.get("dirty")){
        return " *";
      };
      return "";
    }
    
  });
});