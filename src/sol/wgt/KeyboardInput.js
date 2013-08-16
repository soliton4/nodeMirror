define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "dojo/dom-construct"
  , "dojo/on"
  , "dojo/_base/lang"
  , "dojo/keys"
], function(
  declare
  , _WidgetBase
  , domConstruct
  , on
  , lang
  , keys
){
  
  var basicMap = {};
  var codeMap = {};
  
  var newFun = function(){
    return function(){}; // to avoid jshint error
  };
  
  for(var k in keys){
    basicMap["on" + k] = newFun();
    codeMap[keys[k]] = k;
  };
  var BasicMap = declare([], basicMap);
  
  return declare([_WidgetBase, BasicMap], {
    
    buildRendering: function(){
      this.domNode = domConstruct.create("div", {
        style: {
          height: "0px"
          , width: "0px"
          , overflow: "hidden"
        }
      });
      this.inherited(arguments);
      this.textarea = domConstruct.create("textarea");
      domConstruct.place(this.textarea, this.domNode);
      on(this.textarea, "keypress", lang.hitch(this, "_keypress"));
      on(this.textarea, "keydown", lang.hitch(this, "_keydown"));
      if (!this.keyMap){
        this.keyMap = {};
      };
    }
    
    , _keypress: function(e){
      e.charOrCode = e.keyChar || e.keyCode;
      if (e.charOrCode){
        if (this.keyMap[e.charOrCode]){
          this.keyMap[e.charOrCode](e);
        };
        if (codeMap[e.charOrCode]){
          this["on" + codeMap[e.charOrCode]](e);
        };
        var c = String.fromCharCode(e.charOrCode);
        if (c.length){
          this.onInput(e.shiftKey ? c.toUpperCase() : c, e);
        };
        
      };
    }
    
    , _keydown: function(e){
      e.charOrCode = e.keyChar || e.keyCode;
      if (e.charOrCode){
        if (this.keyMap[e.charOrCode]){
          this.keyMap[e.charOrCode](e);
        };
        if (codeMap[e.charOrCode]){
          this["on" + codeMap[e.charOrCode]](e);
        };
        /*if (typeof e.charOrCode == "String"){
          this.onInput(e.charOrCode, e);
        };*/
      };
    }
    
    , focus: function(){
      this.textarea.focus();
    }
    
    , onInput: function(charStr, evt){}
    
  });
});