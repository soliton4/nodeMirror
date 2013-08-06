define([
  "dojo/_base/declare"
  , "dojo/_base/lang"
  , "dijit/_WidgetBase"
  , "dojo/dom-construct"
  , "dojo/dom-attr"
], function(
  declare
  , lang
  , _WidgetBase
  , domConstruct
  , domAttr
){
  return declare([_WidgetBase], {
    buildRendering: function(){
      var par = {};
      if (this.src){
        par.src = this.src;
      };
      if (this.innerHTML){
        par.innerHTML = this.innerHTML;
      };
      this.domNode = domConstruct.create("iframe", par);
      this.inherited(arguments);
    }
    
    , _setSrcAttr: function(parSrc){
      domAttr.set(this.domNode, "src", parSrc);
    }
    
    , _setInnerHTMLAttr: function(parInnerHtml){
      this._set("innerHTML", parInnerHtml);
      if (this._started){
        this.domNode.contentWindow.document.open('text/html', 'replace');
        this.domNode.contentWindow.document.write(this.innerHTML);
        this.domNode.contentWindow.document.close();
      };
    }
    
    , _getDocumentAttr: function(){
      return (
        this.domNode.contentDocument 
        || (
          this.domNode.contentWindow 
          && this.domNode.contentWindow.document
        )
      );
    }
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      if (this.innerHTML){
        this.set("innerHTML", this.innerHTML);
      };
    }
  });
});