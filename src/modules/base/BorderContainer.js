/*
  a BorderContainer as base class in the client
  gives you also a menu and some convenient flags
*/
define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "main/clientOrStub!dijit/layout/BorderContainer"
  , "main/clientOrStub!./WidgetMixin"
  , "modules/base/Base"
], function(
  declare
  , lang
  , BorderContainer
  , WidgetMixin
  , Base
){
  return declare([
    Base
    , BorderContainer
    , WidgetMixin
  ], {
    "class": "content"
    , gutters: false
    , showMenu: true
    
    //, content: {} // will be provided
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      return ret;
    }
    
  });
});
