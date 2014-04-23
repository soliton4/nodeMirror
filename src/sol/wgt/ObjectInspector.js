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
    var self = this;
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
            , name: self.name
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
          if (typeof v === "boolean"){
            if (v){
              return "true";
            };
            return "false";
          };
          ret += "unsupported type: " + (typeof v);
          return ret;
        }
      };
  };

  
  var Inspector = declare([OnDemandGrid, DijitRegistry, Keyboard, Selection], {
    name: ""
    
    , constructor: function(par){
      var self = this;
      this.value = par.value;
      if (par.name){
        this.name = par.name;
      };
      makestoreFun.apply(this);
      
      this.columns = [
        tree({
          label: "Name"
          , field: "name"
          , sortable: false
          , shouldExpand: function(row, level, previouslyExpanded){
            // summary:
            //		Function called after each row is inserted to determine whether
            //		expand(rowElement, true) should be automatically called.
            //		The default implementation re-expands any rows that were expanded
            //		the last time they were rendered (if applicable).
            if ((self.expandlevel !== undefined) && level <= self.expandlevel){
              return true;
            };
            return previouslyExpanded;
          }
        })
        , {
          label: "Value"
          , field: "text"
          , sortable: false
        }
      ];
      
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
  });
  return Inspector;
  
});
