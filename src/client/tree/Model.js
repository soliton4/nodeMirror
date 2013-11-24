define([
  "dojo/_base/declare"
  , "main/treeItems"
  , "main/config"
], function(
  declare
  , treeItems
  , config
){
  return declare([
  ], {
    getRoot: function(thenFun, errFun){
      config.get("treefiles").then(function(treefiles){
        treeItems.getRootDef(treefiles).then(thenFun, errFun);
      });
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
      config.get("treefiles").then(function(treefiles){
        treeItems.getChildrenDef(parItem.id, treefiles).then(thenFun, errFun);
      });
	}
  });
});
