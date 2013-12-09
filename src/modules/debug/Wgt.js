define([
  "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "dijit/MenuBar"
  , "dijit/MenuItem"
  , "dojo/_base/lang"
  , "./CreateDlg"
  , "dijit/layout/AccordionContainer"
  , "./DebuggerWgt"
], function(
  declare
  , BorderContainer
  , MenuBar
  , MenuItem
  , lang
  , CreateDlg
  , AccordionContainer
  , DebuggerWgt
){
  return declare([
    BorderContainer
  ], {
    title: "Debug"
    
    , gutters: false
    
    , constructor: function(){
      this.debuggers = {};
	}
    
    , buildRendering: function(){
      this.inherited(arguments);
      
      this.menu = this.ownObj(new MenuBar({
        region: "top"
      }));
      this.addChild(this.menu);
      
      this.createBtn = this.ownObj(new MenuItem({
        label: "create Debugger"
        , onClick: lang.hitch(this, "createDebugger")
      }));
      this.menu.addChild(this.createBtn);
      
      this.debuggersContainer = this.ownObj(new AccordionContainer({
        region: "center"
      }));
      this.addChild(this.debuggersContainer);
    }
    
    , applyList: function(list){
      var d;
      for (d in this.debuggers){
        if (!list[d]){
          this.debuggers[d].destroy();
          delete this.debuggers[d];
        };
      };
      for (d in list){
        if (!this.debuggers[d]){
          this.debuggers[d] = new DebuggerWgt(lang.mixin({
            debugId: d
            , module: this.module
          }, list[d]));
          this.debuggersContainer.addChild(this.debuggers[d]);
        };
      };
      this.resize();
      console.log(list);
    }
    
    , createDebugger: function(){
      var dlg = this.ownObj(new CreateDlg());
      var self = this;
      dlg.show();
      dlg.promise.then(lang.hitch(this.module, "createDebugger")).then(function(list){
        self.applyList(list);
      });
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      this.module.getList().then(lang.hitch(this, "applyList"));
    }
    
  });
});
