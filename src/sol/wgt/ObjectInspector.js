define([
  "dojo/_base/declare"
  , "dgrid/OnDemandGrid", "dgrid/tree", "dgrid/Keyboard", "dgrid/Selection"
  , "dgrid/extensions/DijitRegistry"
  , "dojo/store/Memory"
], function(
  declare
  , OnDemandGrid, tree, Keyboard, Selection
  , DijitRegistry
  , Memory
){
  var Inspector = declare([OnDemandGrid, DijitRegistry, Keyboard, Selection], {
    constructor: function(par){
      this.store = new Memory({
		data: [par.value],
		getChildren: function(parent, options){
			return [];//this.query({parent: parent.id}, options);
		},
		mayHaveChildren: function(parent){
			return true; //parent.type != "city";
		},
		query: function(query, options){
          return [{
            name: "root"
            , value: "x"
          }];/*
			var def = new Deferred();
			var immediateResults = this.queryEngine(query, options)(this.data);
			setTimeout(function(){
				def.resolve(immediateResults);
			}, 200);
			var results = QueryResults(def.promise);
			return results;*/
		}
      });
    }
    , isLeftToRight: function(){
      return true;
    }
    , placeAt: function(parNode, par2){
      domConstruct.place(this.domNode, parNode, par2);
    }
      , columns: [
            tree({ label: "Name", field: "name" }),
            { label:"Value", field: "vaue", sortable: false}
      ]
    });
  return Inspector;
  
});
