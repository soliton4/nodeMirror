define([
  "dojo/_base/declare"
  , "dijit/_WidgetBase"
  , "dojo/dom-construct"
  , "dojo/on"
  , "dojo/_base/lang"
  , "dojo/keys"
  , "dojo/_base/event"
  , "dojo/Evented"
  
], function(
  declare
  , _WidgetBase
  , domConstruct
  , on
  , lang
  , keys
  , event
  , Evented
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
  
  return declare([Evented, _WidgetBase, BasicMap], {
    
    buildRendering: function(){
      var self = this;
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
      on(this.textarea, "keyup", lang.hitch(this, "_keyup"));
      if (!this.keyMap){
        this.keyMap = {};
      };
      on(this.textarea, "focus", function(){
        self._focused = true;
        self.emit("focus");
      });
      on(this.textarea, "blur", function(){
        self._focused = false;
        self.emit("blue");
      });
    }
    
    , isFocused: function(){
      return !!this._focused;
    }
    
    , lookupCode: function(parCode){
      return codeMap[parCode];
    }
    
    , _keypress: function(e){
      event.stop(e);
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
      event.stop(e);
      e.charOrCode = e.keyChar || e.keyCode;
      if (e.charOrCode){
        if (this.keyMap[e.charOrCode]){
          try{
            this.keyMap[e.charOrCode](e);
          }catch(er){};
        };
        if (codeMap[e.charOrCode]){
          try{
            this["on" + codeMap[e.charOrCode]](e);
          }catch(er){};
        };
        this.emit("keydown", e);
        this.emit("keydown" + e.charOrCode, e);
        /*if (typeof e.charOrCode == "String"){
          this.onInput(e.charOrCode, e);
        };*/
      };
    }
    , _keyup: function(e){
      event.stop(e);
      e.charOrCode = e.keyChar || e.keyCode;
      if (e.charOrCode){
        this.emit("keyup", e);
        this.emit("keyup" + e.charOrCode, e);
      };
    }
    
    , focus: function(){
      this.textarea.focus();
    }
    
    , blur: function(){
      this.textarea.blur();
    }
    
    , onInput: function(charStr, evt){}
    
  });
});