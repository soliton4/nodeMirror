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
){
  
  return declare([BaseBorderContainer], {
    
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { createFilePs: true} )
    
    , reloadButton: true
    , downloadButton: true
    
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
      
      files.childrenDef(fileName).then(function(ar){
        var result = {
          children: []
        };
        solPromise.allDone(array.map(ar, function(child){
          var entry = {
            type: "file"
            , id: nameTranslator.reduceName(child)
          };
          result.children.push(entry);
          return files.contentTypeDef(child).then(function(contentType){
             entry.contentType = contentType;
          });
        })).then(function(){
          def.resolve(result);
        });
      });
      
      /*files.childrenDef(fileName).then(function(ar){
        files.contentTypesDef(ar).then(function(typesAr){
          console.log(typesAr);
        });
        
      });*/
      
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
      
      this.newDirButton = this.ownObj(new Button({
        label: "new Directory"
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
      
      this.grid = this.ownObj(new Grid({
        content: this.content
        , mainWgt: this
      }));
      this.addChild(this.grid);
      return ret;
    }
    
    , _setContentAttr: function(parContent){
      this._set("content", parContent);
      this.grid.set("content", parContent);
      this.grid.doRender();
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
