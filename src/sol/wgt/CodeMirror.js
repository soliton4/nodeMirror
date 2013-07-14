// requires lib/codemirror.js loaded
define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "dijit/_WidgetBase"
  , "dojo/dom-geometry"
  , "sol/convenient/Delayed"
], function(
  declare
  , lang
  , WidgetBase
  , domGeometry
  , Delayed
){

  var cmOptions = {
    lineNumbers: false
    , mode: undefined
    , theme: "default"
  };
  
  return declare([
    WidgetBase
  ], {
    
    constructor: function(){
      var mix = {
      };
      var o;
      function f(oriName, setName){
          mix["_set" + setName + "Attr"] = function(newValue){
            this._set(oriName, newValue);
            this.mirror.setOption(oriName, newValue);
          };
          mix["_get" + setName + "Attr"] = function(){
            return this.mirror.getOption(oriName);
          };
      };
      for(o in cmOptions){
        f(o, o[0].toUpperCase() + o.substr(1));
      };
      declare.safeMixin(this, mix);
      this.checkDelayed = this.ownObj(new Delayed({
        delay: 3000
      }, lang.hitch(this, "updateHints")));
    }
    
    , buildRendering: function(){
      this.inherited(arguments);
      this.mirror = new CodeMirror(this.domNode);
      this.mirror.setValue(this.value);
      //this.mirror.setOption("mode", this.mode);
      this.widgets = [];
    }
    
    , updateHints: function() {
      if (!JSHINT){
        return;
      };
      var mode = this.mirror.getMode();
      if (!mode || mode.name != "javascript"){
        return;
      };
      
      this.mirror.operation(lang.hitch(this, function(){
        var i;
        for (i = 0; i < this.widgets.length; ++i){
          this.mirror.removeLineWidget(this.widgets[i]);
        };
        this.widgets = [];
        
        JSHINT(this.mirror.getValue(), {
          laxcomma: true
          , laxbreak: true
          , multistr: true
          , maxerr: 1000
          , newcap: false
        });
        this.jshintErrors = 0;
        for (i = 0; i < JSHINT.errors.length; ++i) {
          var err = JSHINT.errors[i];
          if (!err) continue;
          if (err.reason == "Unnecessary semicolon."
              || err.reason == "Expected a 'break' statement before 'case'."
          ){
            continue;
          };
          var msg = document.createElement("div");
          var icon = msg.appendChild(document.createElement("span"));
          icon.innerHTML = "!!";
          icon.className = "lint-error-icon";
          msg.appendChild(document.createTextNode(err.reason));
          msg.className = "lint-error";
          this.widgets.push(this.mirror.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
          this.jshintErrors++;
        };
      }));
    }
    
    , postMixInProperties: function(){
      this.inherited(arguments);
    }
    
    , startup: function(){
      if (this._started) { return; };
      this.inherited(arguments);
      this.mirror.on("change", lang.hitch(this, function(){
        if (this.jshintErrors > 0){
          this.checkDelayed.execNow();
        }else{
          this.checkDelayed.exec();
        };
      }));
      this.checkDelayed.execNow();
    }
    
    , _setValueAttr: function(parValue){
      this._set("value", parValue);
      this.mirror.getDoc().setValue(parValue);
    }
    
    , _getValueAttr: function(){
      return this.mirror.getDoc().getValue();
    }
    
    , resize: function(changeSize){
      if (changeSize){
        domGeometry.setMarginBox(this.domNode, changeSize);
      };
      var box = domGeometry.getMarginBox(this.domNode);
      this.mirror.setSize(box.w, box.h);
      
    }
    
    , destroy: function(){
      this.inherited(arguments);
    }
    
  });
});
