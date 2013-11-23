define([
	"dojo/_base/declare", // declare
	"dojo/dom", // dom.setSelectable
	"dojo/dom-attr", // domAttr.attr
	"dojo/dom-class", // domClass.toggle
	"dojo/_base/lang" // lang.hitch lang.trim
  , "dijit/layout/TabController"
  , "dojo/dom-construct"
  , "dojo/_base/fx"
  , "dojo/dom-style"
  , "sol/convenient/SceduleExec"
  , "sol/convenient/Delayed"
], function(
  declare
  , dom
  , domAttr
  , domClass
  , lang
  , LayoutTabController
  , domConstruct
  , fx
  , domStyle
  , SceduleExec
  , DelayedExec
){
  

	var TabButton = declare(LayoutTabController.TabButton, {


		buildRendering: function(){
			this.inherited(arguments);
          this.fadeNode = domConstruct.create("div", {
            "class": "fadeNode"
          });
          domConstruct.place(this.fadeNode, this.domNode);
          domStyle.set(this.fadeNode, {
            opacity: 0
          });
          this.doAnimation = this.ownObj(new DelayedExec({
            delay: 60000 * 5 // 5 min
          }, lang.hitch(this, function(){
            console.log("called it");
            this.createAnimation();
          })));
		},
      
      createAnimation: function(){
        if (this.anim && this.anim.Stop){
          this.anim.Stop();
        };
          this.anim = this.ownObj(fx.animateProperty({
            node: this.fadeNode,
            duration: 60000 * 15 // 15 min (total 20 min)
            , rate: 1500
            , properties: {
              opacity: {start: 0, end: 1}
            }
          }));
        this.anim.play();
      },
        
		startup: function(){
			this.inherited(arguments);
          if (this.page.get("class") == "terminalTab"){
            domClass.add(this.domNode, "terminalTabButton");
          };
		}
      
      , onChange: function(parValue){
          if (this.page.get("class") == "terminalTab"){
            return;
          };
        if (parValue){
          domClass.remove(this.domNode, "fading");
          domClass.remove(this.domNode, "dirty");
          if (this.anim && this.anim.Stop){
            this.anim.Stop();
          };
          console.log("cancel");
          this.doAnimation.cancel();
          domStyle.set(this.fadeNode, {
            opacity: 0
          });
        }else{
          domClass.add(this.domNode, "fading");
          //debugger;
          if (this.page.get("dirty")){
            domClass.add(this.domNode, "dirty");
          };
          this.doAnimation.exec();
        }
        domStyle.set(this.fadeNode, {
          opacity: 0
        });
      }

	});


	var TabController = declare(LayoutTabController, {


		// buttonWidget: Constructor
		//		The tab widget to create to correspond to each page
		buttonWidget: TabButton,


	});

	TabController.TabButton = TabButton;	// for monkey patching

	return TabController;
});
