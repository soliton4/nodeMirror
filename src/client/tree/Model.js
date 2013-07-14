define([
  "dojo/_base/declare"
  , "main/treeItems"
], function(
  declare
  , treeItems
){
  return declare([
  ], {
    getRoot: function(thenFun, errFun){
	  treeItems.getRootDef().then(thenFun, errFun);
	}
	, getLabel: function(parItem){
	  return parItem.name;
	}
	, mayHaveChildren: function(parItem){
	  return parItem.hasChildren;
	}
	, getIdentity: function(parItem){
	  return parItem.id;
	}
	, getChildren: function(parItem, thenFun, errFun){
	  treeItems.getChildrenDef(parItem.id).then(thenFun, errFun);
	}
  });
});
