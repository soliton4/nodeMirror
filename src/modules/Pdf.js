define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/_base/lang"
  , "sol/promise"
  , "dojo/_base/array"
  , "main/serverOnly!server/files"
  , "sol/string"
  , "modules/base/Base"
  , "modules/base/BorderContainer"
  , "main/serverOnly!dojo/node!imagemagick"
  , "main/clientOnly!./image/ImageWgt"
], function(
  declare
  , Deferred
  , lang
  , solPromise
  , array
  , files
  , solString
  , Base
  , BorderContainerBase
  , im
  , ImageWgt
){
  
  /*var additionalSubtypes = {
    "octet-stream": true
  };
    
  var additionalTypes = {
  };*/
  
  return declare([BorderContainerBase], {
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { 
      getBase64Ps: true
    })
    
    , "class": "content binary"
    
    //, saveButton: true
    , reloadButton: true
    , downloadButton: true
    , binaryModeButton: true
    
    , buildRendering: function(){
      var ret = this.inherited(arguments);
      
      this.imageWgt = this.ownObj(new ImageWgt({
        module: this
        , region: "center"
      }));
      this.addChild(this.imageWgt);
      
      return ret;
    }
    
    
    // the module decides if it is competent to handle that type
    /* par: {
         type: ["file"|"..."]
         , id: <type specific id>
         , contentType: file content type detected by magic or mime
       }
    */
    , isCompetentPs: function(par){
      var def = this.def();
      if (par.contentType == "application/pdf"){
        def.resolve();
      }else{
        def.reject();
      };
      return def;
    }
    
    , _setContentAttr: function(par){
      this.imageWgt.load(this.par);
    }
    
    , getContentPs: function(par){
      var def = this.def();
      
      //var fileName = this.getFileName(par.id);
      
      var result = {
        isImage: true
      };
      def.resolve(result);
      
      return def;
    }
    
    , getBase64Ps: function(parName, par){
      var def = new Deferred();
      var name = this.getFileName(parName);
      //console.log("doing resize: " + name);
      
      //require("dojo/node!imagemagick", function(im){
        
        var options = {
          srcPath: name,
          format: 'png',
          width: par.width,
          height: par.height
        };
        //console.log("doing resize: " + name);
        im.resize(options, function(err, stdout, stderr){
          if (err){
            console.log(err);
          };
          var buf = new Buffer(stdout, 'binary');
          //console.log(buf.toString("base64"));
          def.resolve(buf.toString("base64"));
          
          //console.log(stdout);
        });
        
      //});

      
      return def;
    }
    
    
  });
});
