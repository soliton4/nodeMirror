define([
  "dojo/_base/declare"
  , "modules/base/Base"
  , "modules/base/BorderContainer"
  , "dojo/Deferred"
  , "dojo/has"
  , "sol/promise"
  , "dojo/_base/array"
  , "main/nameTranslator"
  , "main/serverOnly!server/files"
  , "main/clientOnly!./directory/Grid"
  , "main/clientOnly!./directory/NewDlg"
  , "main/clientOnly!dijit/form/Button"
  , "dojo/_base/lang"
  , "main/clientOnly!sol/wgt/Turn"
  , "main/clientOnly!dijit/Menu"
  , "main/clientOnly!dijit/MenuItem"
  , "main/clientOnly!dijit/form/ComboButton"
  , "dojo/topic"
  , "main/config"
  , "main/clientOnly!dojo/dom-class"
], function(
  declare
  , Base
  , BaseBorderContainer
  , Deferred
  , has
  , solPromise
  , array
  , nameTranslator
  , files
  , Grid
  , NewDlg
  , Button
  , lang
  , Turn
  , Menu
  , MenuItem
  , ComboButton
  , topic
  , config
  , domClass
){
  
  
  return declare([BaseBorderContainer], {
    
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { createFilePs: true } )
    
    , reloadButton: true
    , downloadButton: true
    , "class": "directory"
    , viewMode: "list"
    , openDirButton: false
    
    // the model decides if it is competent to handle that type
    /* par: {
         type: ["file"|"..."]
         , id: <type specific id>
         , contentType: file content type detected by magic or mime
       }
    */
    , isCompetentPs: function(par){
      var def = this.def();
      if (par.contentType == "inode/directory"){
        //console.log("resolving");
        def.resolve();
      }else{
        def.reject();
      };
      return def;
    }
    
    , getContentPs: function(par){
      var def = this.def();
      
      var fileName = this.getFileName(par.id);
      
      var result = {
        children: []
      };
      files.childrenDef(fileName).then(function(ar){
        if (!ar || !ar.length){
          def.resolve(result);
          return;
        };
        files.contentTypesDef(ar).then(function(typesAr){
          result.children = array.map(typesAr, function(f){
            var r = {
              type: "file"
              , contentType: f.type
              , id: nameTranslator.reduceName(f.name)
            };
            if (f.stats){
              r.size = f.stats.size;
              r.mtime = f.stats.mtime;
            };
            return r;
          });
          def.resolve(result);
        });
        
      });
      
      return def;
    }
    
    , createFilePs: function(par, nameStr, newDir){
      var def = this.def();
      //var rejectFun = lang.hitch(def, "reject");
      var rejectFun = function(e){
        def.reject();
        console.log("createFilePs");
        console.log(e);
      };
      var newFileNameStr = par.id + "/" + nameStr;
      
      if (!nameStr || !nameStr.length){
        def.reject();
        return;
      };
      
      var name = nameTranslator.fileName(newFileNameStr);
      
      var doneFun = lang.hitch(this, function(){
        try{
          require([
            "main/contentIO"
          ], function(contentIO){
            //console.log("done2" + newFileNameStr);
            try{
              contentIO.getContentDef({
                type: "file"
                , id: newFileNameStr
              }).then(function(parContent){
                //console.log("done3" + newFileNameStr);
                def.resolve(parContent);
              }, function(e){
                console.log(e);
              });
            }catch(e){
              console.log(e);
              def.reject();
            };
          });
        }catch(e){
          console.log(e);
          def.reject();
        };
      });
      
      if (newDir){
        files.createDirDef(name).then(doneFun, rejectFun);
      }else{
        files.createFileDef(name).then(doneFun, rejectFun);
      };
      
      return def.promise;
    }
    
    , downloadbutton: true
    , reloadbutton: true
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      var self = this;
      
      config.get("dirViewMode").then(function(viewMode){
        if (viewMode == "details" || viewMode == "list"){
          self.set("viewMode", viewMode);
        };
      });
      /*config.get("dirColorCode").then(function(colorCode){
        if (colorCode){
          domClass.add(self.domNode, "colorCode");
        };
      });*/
       
      this.upDirButton = this.ownObj(new Button({
        label: "up"
        , showLabel: true
        , onClick: lang.hitch(this, "goUp")
        , region: "left"
        , disabled: (this.par.id && this.par.id.length) ? false : true
      }));
      this.menu.addChild(this.upDirButton, 0);
      
      
      this.newDirButton = this.ownObj(new Button({
        label: "new Folder"
        , showLabel: true
        , onClick: lang.hitch(this, "createNew", true)
        , region: "left"
      }));
      this.menu.addChild(this.newDirButton);
      
      this.newButton = this.ownObj(new Button({
        label: "new File"
        , showLabel: true
        , onClick: lang.hitch(this, "createNew", false)
        , region: "left"
      }));
      this.menu.addChild(this.newButton);
      
      
      this.searchButton = this.ownObj(new Button({
        "class": "searchButton",
        label: "search"
        , showLabel: true
        , onClick: lang.hitch(this, "search")
        , region: "left"
      }));
      this.menu.addChild(this.searchButton);
      
      
      var menu = new Menu({ style: "display: none;"});
      var menuItem1 = new MenuItem({
        label: "Details",
        onClick: function(){ self.set("viewMode", "details"); }
      });
      menu.addChild(menuItem1);
      
      var menuItem2 = new MenuItem({
        label: "List",
        onClick: function(){ self.set("viewMode", "list"); }
      });
      menu.addChild(menuItem2);
      
      self.viewButton = new ComboButton({
        "class": "viewButton",
        label: "Details",
        dropDown: menu,
        viewMode: "details",
        onClick: function(){ 
          self.set("viewMode", this.viewMode); 
        }
      });
      self.menu.addChild(self.viewButton);
          
      
      this.grid = this.ownObj(new Grid({
        content: this.content
        , mainWgt: this
        , viewMode: this.viewMode
      }));

      this.turnWgt = this.ownObj(new Turn({
        region: "center"
        , widget: this.grid
        , rotate: -90
      }));
      this.addChild(this.turnWgt);
      
      return ret;
    }
    
    , goUp: function(){
      
      var idStr = "";
      var s = this.par.id.split("/");
      for (i = 0; i < s.length - 1; ++i){
        if (i){
          idStr += "/";
        };
        idStr += s[i];
      };
      
      topic.publish("client/openid", {
        item: {
          id: idStr
          , type: "file"
        }
        , insteadOf: this
      });
      
    }
    
    , _setViewModeAttr: function(viewMode){
      /*if (this.viewMode == viewMode){
        return;
      };*/
      config.set("dirViewMode", viewMode);
      
      this._set("viewMode", viewMode);
      if (this.grid){
        this.grid.set("viewMode", viewMode);
        if (viewMode == "list"){
          this.turnWgt.set("rotate", -90);
        }else{
          this.turnWgt.set("rotate", 0);
        };
        var self = this;
        setTimeout(function(){
          self.resize();
          setTimeout(function(){
            self.grid.doRender();
          }, 20);
        }, 0);
        if (viewMode == "details"){
          this.viewButton.set("viewMode", "list");
          this.viewButton.set("label", "List");
        }else{
          this.viewButton.set("viewMode", "details");
          this.viewButton.set("label", "Details");
        }
      };
    }
    
    , _setContentAttr: function(parContent){
      this._set("content", parContent);
      this.grid.set("content", parContent);
      this.grid.doRender();
    }
    
    , _setOriginalTitleAttr: function(par){
      this._set("originalTitle", par);
      this._set("title", par + "/");
    }

    
    , search: function(){
      var self = this;
      require(["main/moduleLoader!client"], function(moduleLoader){
        var search = moduleLoader.getModule("modules/Search");
        search.openSearchTab({
          directory: self.par.id
        });
      });
    }
    
    , createNew: function(parDir){
      var dlg = new NewDlg({
        newDir: parDir
        , parent: this
      });
      dlg.startup();
      dlg.show();
    }
    
  });
});
