define([
  "dojo/_base/declare"
  , "sol/fileName"
  , "dojo/dom-construct"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/layout/BorderContainer"
  , "dijit/form/Button"
  , "./Text"
  , "./html/Tester"
], function(
  declare
  , fileName
  , domConstruct
  , lang
  , topic
  , BorderContainer
  , Button
  , TypeText
  , Tester
){
  return declare([
    TypeText
  ], {
    "class": "content text pegjs"
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      this.testBtn = this.ownObj(new Button({
        onClick: lang.hitch(this, "test")
        , label: "test"
      })); 
      this.menu.addChild(this.testBtn);
      return ret;
    }
    
    , test: function(){
      if (!this.tester){
        this.tester = this.ownObj(new Tester({
          parent: this
        }));
        this.addChild(this.tester);
        this.mirror.on("change", lang.hitch(this, function(){
          this.tester.codeChanged();
        }));
      };
      this.tester.test();
    }
    
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
    }
    
  });
});
