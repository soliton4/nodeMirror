define([
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/dom-attr", // domAttr.attr
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/lang" // lang.hitch lang.trim
  , "dijit/layout/ScrollingTabController"
  , "dojo/dom-construct"
  , "dojo/_base/fx"
  , "dojo/dom-style"
  , "sol/convenient/SceduleExec"
  , "./TabController"
], function(
  declare
  , dom
  , domAttr
  , domClass
  , lang
  , LayoutScrollingTabController
  , domConstruct
  , fx
  , domStyle
  , SceduleExec
  , TabController
){
  

	var ScrollingTabController = declare(LayoutScrollingTabController, {


		// buttonWidget: Constructor
		//		The tab widget to create to correspond to each page
		buttonWidget: TabController.TabButton


	});

	return ScrollingTabController;
});
