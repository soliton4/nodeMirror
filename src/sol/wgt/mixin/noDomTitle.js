
define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "dojo/dom-attr"
], function(
  declare
  , lang
  , domAttr
){
  
  return declare([], {
    
    startup: function(){
      this.inherited(arguments);
      var self = this;
      this.own(this.watch("title", function(attr, oldVal, newVal){
        domAttr.set(self.domNode, "title", "");
        setTimeout(function(){
          domAttr.set(self.domNode, "title", "");
        }, 100);
      }));
    }
    
    // titles are resiliant
    , _setTitleAttr: function(title){
      this._set("title", title);
      this.inherited(arguments);
      var self = this;
        domAttr.set(self.domNode, "title", "");
        setTimeout(function(){
          domAttr.set(self.domNode, "title", "");
        }, 100);
      
    }
    
  });
  
});
