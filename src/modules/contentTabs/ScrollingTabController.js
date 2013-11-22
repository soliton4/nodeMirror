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
  

	/*var TabButton = declare(LayoutTabController.TabButton, {


		buildRendering: function(){
			this.inherited(arguments);
          this.fadeNode = domConstruct.create("div", {
            "class": "fadeNode"
          });
          domConstruct.place(this.fadeNode, this.domNode);
          domStyle.set(this.fadeNode, {
            opacity: 0
          });
          this.anim = this.ownObj(fx.animateProperty({
            node: this.fadeNode,
            duration: 60000 * 15
            , properties: {
              opacity: {start: 0, end: 1}
            }
          }));
          this.doAnimation = this.ownObj(new SceduleExec(lang.hitch(this, function(){
            this.anim.play();
          }), {
            delay: 60000 * 5
          }));
		},

		startup: function(){
			this.inherited(arguments);
		}
      
      , onChange: function(parValue){
        if (parValue){
          domClass.remove(this.domNode, "fading");
          this.anim.stop();
          this.doAnimation.cancel();
          domStyle.set(this.fadeNode, {
            opacity: 0
          });
        }else{
          domClass.add(this.domNode, "fading");
          this.doAnimation.exec();
        }
        domStyle.set(this.fadeNode, {
          opacity: 0
        });
      }

	});*/


	var ScrollingTabController = declare(LayoutScrollingTabController, {


		// buttonWidget: Constructor
		//		The tab widget to create to correspond to each page
		buttonWidget: TabController.TabButton,


	});

	return ScrollingTabController;
});
