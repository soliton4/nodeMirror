define([
  "dojo/_base/declare"
  , "dgrid/Grid"
  , "dgrid/extensions/DijitRegistry"
  , "dojo/dom-construct"
  , "dgrid/Selection"
  , "dojo/_base/lang"
  , "dojo/topic"
  , "dijit/form/Button"
  , "sol/fileName"
], function(
  declare
  , Grid
  , DijitRegistry
  , domConstruct
  , Selection
  , lang
  , topic
  , Button
  , fileName
){
  return declare([
        Grid, DijitRegistry, Selection
  ], {
    content: {} // will be provided
    , region: "center"
    , columns: {
        id: {
            label: "Name"
            , get: function(object){
                return fileName.single(object.id);
            }
        },
        contentType: {
            label: "Content Type"
        }
    }
    , selectionMode: "single"
    , startup: function(){
      if (this._started){
        return;
      };
      this.inherited(arguments);
      this.doRender();
      this.on(".dgrid-row:click", lang.hitch(this, function(evt){
        var row = this.row(evt);
        topic.publish("client/openid", {
          item: row.data
          , insteadOf: this.mainWgt
        });
        // row.element == the element with the dgrid-row class
        // row.id == the identity of the item represented by the row
        // row.data == the item represented by the row
      }));
    }
    
    , doRender: function(){
      if (!this._started){
        return;
      };
      this.refresh();
      this.renderArray(this.content.children);
    }
    
    , isLeftToRight: function(){
      return true;
    }
    , placeAt: function(parNode, par2){
      domConstruct.place(this.domNode, parNode, par2);
    }
  });
  
});
