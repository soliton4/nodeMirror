define([
  "dojo/domReady"
  , "sol/extend/destroyable_ownObj"
  , "dojo/_base/declare"
  , "dijit/layout/BorderContainer"
  , "client/Tree"
  , "main/_RemoteCall"
  , "dojo/dom-class"
  , "dijit/layout/TabContainer"
  , "dojo/_base/lang"
  , "dijit/layout/ContentPane"
  , "client/Content"
  , "dojo/on"
  , "dojo/topic"
  , "dijit/MenuBar"
  , "dijit/form/Button"
  , "main/nodeControl"
], function(
  domReady
  , extendDestroyable
  , declare
  , BorderContainer
  , Tree
  , _RemoteCall
  , domClass
  , TabContainer
  , lang
  , ContentPane
  , Content
  , on
  , topic
  , MenuBar
  , Button
  , nodeControl
){
  
  
  
  var tabs;
  var openIds = {};
  
  function openItem(parItem, insteadOf){
    if (openIds[parItem.id]){
      tabs.selectChild(openIds[parItem.id]);
      return;
    };
    if (insteadOf){
      tabs.removeChild(insteadOf);
      delete openIds[insteadOf.item.id];
      insteadOf.destroy();
    };
    openIds[parItem.id] = new Content({
      item: parItem
      , removeMe: function(){
        delete openIds[parItem.id];
      }
    });
    tabs.addChild(openIds[parItem.id]);
    tabs.selectChild(openIds[parItem.id]);
  };
  
  topic.subscribe("client/openid", function(par){
    openItem(par.item, par.insteadOf);
  });
  
  domClass.add(document.body, "nodeMirror");
  domClass.add(document.body, "claro");
  var mainBc = new BorderContainer({
    "class": "mainBc"
    , gutters: false
    , liveSplitters: true
  });
  mainBc.placeAt(document.body);
  mainBc.startup();
  
  var sideBar = new BorderContainer({
    "class": "sideBar"
    , "region": "left"
    , splitter: true
  });
  mainBc.addChild(sideBar);
  
  
  var treeMenu = new MenuBar({
    "class": "treeMenu"
    , "region": "top"
  });
  sideBar.addChild(treeMenu);
  
  var restartBtn = new Button({
    label: "Restart"
    , onClick: function(){
      nodeControl.restartDef();
    }
  });
  treeMenu.addChild(restartBtn);
  
  var treeCP = new ContentPane({
    "class": "treeCP"
    , "region": "center"
  });
  sideBar.addChild(treeCP);
  
  
  var tree = new Tree({
    "region": "left"
    , splitter: true
    , onClick: function(item, node, evt){
      openItem(item);
    }
  });
  tree.placeAt(treeCP);
  tree.startup();
  
  
  tabs = new TabContainer({
    "region": "center"
  });
  mainBc.addChild(tabs);
  
  // rendering bug;
  setTimeout(lang.hitch(mainBc, "resize"), 100);
  setTimeout(lang.hitch(mainBc, "resize"), 500);
  /*var x = declare("class1", [_RemoteCall], {
    remoteFunctions: {
	  test1: true
	}
  });
  var xi = new x();*/

  
});
