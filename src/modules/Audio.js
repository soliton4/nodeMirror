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
  , "main/clientOnly!dojo/_base/Color"
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
  , Color
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
      var self = this;
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
        , region: "top"
      }));
      this.addChild(this.aNode);
      if (window.requestAnimationFrame, window.webkitAudioContext){
        this._context = new webkitAudioContext();
        this._analyser = this._context.createAnalyser();
        this._source = this._context.createMediaElementSource(this.aNode.domNode);
        this._source.connect(this._analyser);
        this._analyser.connect(this._context.destination);        
        this._analyser.fftSize = 1024;
        this._analyser.smoothingTimeConstant = 0.2;
      };
      
      if (!this.cNode){
        this.cNode = this.ownObj(new Node({
          tagName: "canvas",
          tagAttributes: {
          }
          , region: "center"
        }));
        this.addChild(this.cNode);
        var ctx = self.cNode.domNode.getContext("2d");
        if (window.requestAnimationFrame, window.webkitAudioContext){
          var frameLoop = function(){
            if (self._destroyed){
              return;
            };
            window.requestAnimationFrame(frameLoop);
            var ar = new Uint8Array(self._analyser.frequencyBinCount);
            self._analyser.getByteFrequencyData(ar);
            ctx.clearRect(0, 0, self.cNode.domNode.width, self.cNode.domNode.height); // Clear the canvas
            //ctx.fillStyle = '#00CCFF'; // Color of the bars
            bars = 512;
            for (var i = 0; i < bars; i++) {
              var v = ar[i];
              var r = v < 128 ? 0 : (v - 128) * 2;
              var g = v < 64 ? 0 : v > 192 ? 255 - ((v - 192) * 4) : (v - 64) * 2;
              var b = v > 128 ? 0 : 255 - (v * 2);
              var c = new Color([r, g, b]);
              ctx.fillStyle = c.toHex();
              bar_x = i;
              bar_width = 1;
              bar_height = -(ar[i] / 2);
              //fillRect( x, y, width, height ) // Explanation of the parameters below
              ctx.fillRect(bar_x, self.cNode.domNode.height, bar_width, bar_height);
            };
          };
          window.requestAnimationFrame(frameLoop);
        };
      };
    }
    
    , destroy: function(){
      /*if (window.cancelAnimationFrame && this.animationId){
        window.cancelAnimationFrame(this.animationId);
      };*/
      return this.inherited(arguments);
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
            '-threads', "2",
            '-i', name,
            '-f', "ogg",
            '-acodec', 'libvorbis',
            '-vcodec', 'libtheora',
            '-vn',
            '-threads', "2",
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
