// requires lib/codemirror.js loaded
define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "dijit/_WidgetBase"
  , "dojo/dom-geometry"
  , "sol/convenient/Delayed"
  , "codemirror/CodeMirror"
  //, "jshint/jshint"
  , "codemirror/addon/hint/all"
  , "dojo/_base/array"
  , "codemirror/addon/display/fullscreen"
  , "codemirror/addon/comment/comment"
], function(
  declare
  , lang
  , WidgetBase
  , domGeometry
  , Delayed
  , CodeMirror
  //, JSHINT
  , allHints
  , array
  , commentAddOn
){

  var cmOptions = {
    lineNumbers: false
    , mode: undefined
    , theme: "default"
    , matchBrackets: true
    , readOnly: false
    , autoCloseBrackets: true
    , matchTags: true
    , showTrailingSpace: false
    , autoCloseTags: true
    , foldGutter: true
    , gutters: true
    , extraKeys: {}
    , placeholder: ""
    , lineWrapping: false
    , keyMap: "default"
    , styleActiveLine: true
  };
  
  var hintMap = {};
  array.forEach(allHints, function(parHint){
    hintMap[parHint] = true;
  });
  
  CodeMirror.commands.autocomplete = function(cm) {
    var mode = cm.getMode();
    if (mode){
      if (CodeMirror.hint[mode.name]){
        CodeMirror.showHint(cm, CodeMirror.hint[mode.name]);
        return;
      };
    };
    CodeMirror.showHint(cm, CodeMirror.hint.anyword);
  };  
  
  return declare([
    WidgetBase
  ], {
    
    extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
    
    , lint: true
    
    , constructor: function(){
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
      /*this.checkDelayed = this.ownObj(new Delayed({
        delay: 3000
      }, lang.hitch(this, "updateHints")));*/
    }
    
    , buildRendering: function(){
      this.inherited(arguments);
      this.mirror = new CodeMirror(this.domNode);
      if (this.value){
        this.mirror.setValue(this.value);
      };
      this.mirror.setOption("extraKeys", this.extraKeys);
      //this.widgets = [];
    }
    
    , _setAutoCompleteAttr: function(parValue){
      this._set("autoComplete", parValue);
      var keyMap = this.mirror.getOption("extraKeys") || {};
      if (parValue){
        keyMap["Ctrl-Space"] = "autocomplete";
      }else{
        delete keyMap["Ctrl-Space"];
      };
      this.mirror.setOption("extraKeys", keyMap);
    }
    
    , focus: function(){
      this.inherited(arguments);
      this.mirror.focus();
    }
    
    , on: function(parWhat, parFun){
      return this.mirror.on(parWhat, parFun);
    }
    
    , _setLintAttr: function(parValue){
      this._set("lint", parValue);
      
      var helper = this.mirror.getHelper(CodeMirror.Pos(0, 0), "lint");
      if (helper){
        if (parValue){
          this.mirror.setOption("lint", {options: {
            laxcomma: true
          , laxbreak: true
          , multistr: true
          , maxerr: 300
          , newcap: false
          , "-W032": true
          }});
        }else{
          this.mirror.setOption("lint", parValue);
        }
      }else{
        this.mirror.setOption("lint", false);
      };
    }
    
    , postMixInProperties: function(){
      this.inherited(arguments);
    }
    
    , startup: function(){
      if (this._started) { return; };
      this.inherited(arguments);
      
      if (this.jshint === undefined){
        var mode = this.mirror.getMode();
        if (mode && mode.name == "javascript"){
          this.jshint = true;
        };
      };
      
      this.mirror.refresh();
      
    }
    
    , setCursor: function(){
      this.mirror.getDoc().setCursor.apply(this.mirror.getDoc(), arguments);
    }
    
    , blockComment: function(from, to, options){
      if (!from){
        from = this.mirror.getDoc().getCursor("start");
      };
      if (!to){
        to = this.mirror.getDoc().getCursor("end");
      };
      this.mirror.blockComment(from, to);
    }
    
    , lineComment: function(from, to, options){
      if (!from){
        from = this.mirror.getDoc().getCursor("start");
      };
      if (!to){
        to = this.mirror.getDoc().getCursor("end");
      };
      this.mirror.lineComment(from, to);
    }
    
    , uncomment: function(from, to, options){
      if (!from){
        from = this.mirror.getDoc().getCursor("start");
      };
      if (!to){
        to = this.mirror.getDoc().getCursor("end");
      };
      this.mirror.uncomment(from, to);
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
