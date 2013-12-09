define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/has"
  , "dojo/_base/array"
  , "dojo/_base/lang"
  , "sol/wgt/CodeMirror"
  , "codemirror/theme/all"
  , "main/config"
  //, "modules/text/codeMirrorSettings"
  
], function(
  declare
  , Deferred
  , has
  , array
  , lang
  , CodeMirror
  , allThemes
  , config
  //, codeMirrorSettings
){
  
  return declare([], {
    
    focusCodeMirror: true
    
    , onShow: function(){
      this.inherited(arguments);
      if (this.focusCodeMirror){
        this.mirror.focus();
      };
    }
    
    , codeMirrorParameter: {
      
    }
    
    , _getCodeStr: function(){
      return "";
    }
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      var self = this;
      
      var param = lang.mixin({
        region: "center"
        , value: this._getCodeStr()
        , lineNumbers: true
        , styleActiveLine: true
        , theme: "eclipse"
        , matchBrackets: true
      }, this.codeMirrorParameter);
      
      this.mirror = this.ownObj(new CodeMirror(param));
      this.addChild(this.mirror);
      
      return ret;
    }
    
    , startup: function(){
      if (this._started){ return; };
      this.inherited(arguments);
      if (this.focusCodeMirror){
        setTimeout(lang.hitch(this.mirror, "focus"), 0);
      };
    }
    
  });
});
