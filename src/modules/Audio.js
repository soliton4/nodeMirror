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
  , "main/clientOnly!./video/VideoWgt"
  , "main/clientOnly!dijit/form/HorizontalSlider"
  , "main/clientOnly!dojo/dom-construct"
  , "main/clientOnly!sol/wgt/Node"
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
  , VideoWgt
  , HorizontalSlider
  , domConstruct
  , Node
){
  
  /*var additionalSubtypes = {
    "octet-stream": true
  };
    
  var additionalTypes = {
  };*/
  
  return declare([BorderContainerBase], {
    /*remoteFunctions: lang.mixin({}, Base.remoteFunctions, { 
      getBase64Src: true
    })
    
    ,*/
    "class": "content audio"
    
    //, saveButton: true
    , reloadButton: true
    , downloadButton: true
    , binaryModeButton: true
    
    , buildRendering: function(){
      var self = this;
      var ret = this.inherited(arguments);
      
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
      if (solString.startsWith(par.contentType, "audio/")){
        def.resolve();
      }else{
        def.reject();
      };
      return def;
    }
    
    , _setContentAttr: function(parContent){
      //this._set("content", parContent);
      if (this.aNode){
        this.aNode.destroy();
      };
      this.aNode = this.ownObj(new Node({
        tagName: "audio",
        tagAttributes: {
          src: "data:audio/ogg" + ";base64," + parContent.base64Src
          , type: "audio/ogg"
          , "controls": "controls"
        }
        , region: "center"
      }));
      this.addChild(this.aNode);
    }
    
    , getContentPs: function(par){
      var def = this.def();
      
      var fileName = this.getFileName(par.id);
      
      var result = {
        isAudio: true
        , base64Src: ""
      };
      
      require(["dojo/node!fs", "dojo/node!child_process"], function(fs, child_process){
        fs.realpath(fileName, function (err, name) {
          if (err){
            console.log(err);
            def.reject();
            return;
          };
          
          var spawn  = child_process.spawn;
          
          var params = [
            '-loglevel', 'quiet',
            '-threads', "4",
            '-i', name,
            '-f', "ogg",
            '-acodec', 'libvorbis',
            '-vcodec', 'libtheora',
            '-vn',
            '-threads', "4",
            'pipe:1'
          ];
          
          avconv = spawn('avconv', params);
          
          var base64Str = "";
          var buffersAr = [];
          var stream = avconv.stdout;
          
          stream.on("data", function(data){
            buffersAr.push(data);
          });
          stream.on("end", function(data){
            result.base64Src = Buffer.concat(buffersAr).toString("base64");
            def.resolve(result);
          });
          
        });
      });
      
      
      return def;
    }
    
    
    
    
  });
});
