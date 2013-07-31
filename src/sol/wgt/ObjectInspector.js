define([
  "dojo/_base/declare"
  , "dgrid/OnDemandGrid", "dgrid/tree", "dgrid/Keyboard", "dgrid/Selection"
  , "dgrid/extensions/DijitRegistry"
  , "dojo/store/Memory"
  , "dojo/_base/array"
  , "dojo/_base/lang"
], function(
  declare
  , OnDemandGrid, tree, Keyboard, Selection
  , DijitRegistry
  , Memory
  , array
  , lang
){
  
  var makestoreFun = function(){
    this.store = {
		data: [this.value],
        nextId: 1,
        getIdentity: function(parent){
          if (!parent.id){
            parent.id = this.nextId++;
          };
          return parent.id;
        },
		getChildren: function(parent, options){
          var v = parent.v;
          if (v instanceof Array){
            return array.map(v, lang.hitch(this, function(child, index){
              return {
                name: "" + index
                , v: child
                , text: this._genEntry(child, "" + index)
              };
            }));
          };
          if (typeof v == "object"){
            var res = [];
            var i;
            for(i in v){
              res.push({
                name: i
                , v: v[i]
                , text: this._genEntry(v[i], "" + i)
              });
            };
            return res;
          };
          return [];
		},
		mayHaveChildren: function(parent){
          var v = parent.v;
          if (v === null){
            return false;
          };
          if (v instanceof Array){
            return true;
          };
          if (typeof v == "object"){
            return true;
          };
          return false;
		},
		query: function(query, options){
          return [{
            v: this.data[0]
            , text: this._genEntry(this.data[0])
            , name: ""
          }];
		}
        , _genEntry: function(v, name){
          var ret = "";
          if (name){
            //ret += name + ": ";
          };
          if (v === null){
            ret += "null";
            return ret;
          };
          if (typeof v == "string"){
            ret += "\"" + v + "\"";
            return ret;
          };
          if (v instanceof Array){
            ret += "[...]";
            return ret;
          };
          if (typeof v == "function"){
            ret += "function";
            return ret;
          };
          if (typeof v == "object"){
            ret += "{...}";
            return ret;
          };
          if (typeof v == "number"){
            ret += "" + v;
            return ret;
          };
          if (v === undefined){
            ret += "undefined";
            return ret;
          };
          ret += "unsoported type: " + (typeof v);
          return ret;
        }
      };
  };

  
  var Inspector = declare([OnDemandGrid, DijitRegistry, Keyboard, Selection], {
    constructor: function(par){
      this.value = par.value;
      makestoreFun.apply(this);
    }
    
    , isLeftToRight: function(){
      return true;
    }
    , placeAt: function(parNode, par2){
      domConstruct.place(this.domNode, parNode, par2);
    }
    , _setValue: function(parValue){
      this.value = parValue;
      makestoreFun.apply(this);
      this.refresh();
    }
      , columns: [
            tree({ label: "Name", field: "name", sortable: false }),
            { label:"Value", field: "text", sortable: false}
      ]
    });
  return Inspector;
  
});
