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
){
  
  /*var additionalSubtypes = {
    "octet-stream": true
  };
    
  var additionalTypes = {
  };*/
  
  return declare([BorderContainerBase], {
    remoteFunctions: lang.mixin({}, Base.remoteFunctions, { 
      getJunkPs: true
      , getDurationPs: true
    })
    
    , "class": "content binary"
    
    //, saveButton: true
    , reloadButton: true
    , downloadButton: true
    , binaryModeButton: true
    
    , buildRendering: function(){
      var self = this;
      var ret = this.inherited(arguments);
      
      /*this.videoWgt = this.ownObj(new VideoWgt({
        module: this
        , region: "center"
      }));
      this.addChild(this.videoWgt);*/
      
      self.getDurationPs(self.par.id).then(function(duration){
        self.slider = self.ownObj(new HorizontalSlider({
          minimum: 0
        , maximum: duration
        , value: 0
        , region: "bottom"
        }));
        self.addChild(self.slider);
        self.videoWgt = self.ownObj(new VideoWgt({
          "module": self
          , par: self.par
          , region: "center"
          , duration: duration
        }));
        self.addChild(self.videoWgt);
      });
      
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
      if (solString.startsWith(par.contentType, "video/")){
        def.resolve();
      }else{
        def.reject();
      };
      return def;
    }
    
    , _setContentAttr: function(par){
      //this.videoWgt.load(this.par);
    }
    
    , getContentPs: function(par){
      var def = this.def();
      
      //var fileName = this.getFileName(par.id);
      
      var result = {
        isVideo: true
      };
      def.resolve(result);
      
      return def;
    }
    
    , getDurationPs: function(parName){
      var def = new Deferred();
      var name = this.getFileName(parName);
      console.log("getduration");
      
      require(["dojo/node!fs", "dojo/node!child_process"], function(fs, child_process){
        fs.realpath(name, function (err, name) {
          if (err){
            console.log(err);
            def.rsolve(0);
            return;
          };
          
          var spawn = child_process.spawn;
          
          var params = [
            '-i', name
          ];
          
          avconv = spawn('avconv', params);
          
          var resStr = "";
          var stream = avconv.stderr;
          
          stream.on("data", function(data){
            resStr += data.toString("utf8");
            //console.log(data);
          });
          stream.on("end", function(data){
            var r = /Duration:\s[0-9:.]*/;
            var res = r.exec(resStr);
            if (!res){
              console.log("no res");
              console.log(resStr);
              def.resolve(0);
              return;
            };
            resStr = res[0];
            if (!resStr){
              console.log("no [0]");
              def.resolve(0);
              return;
            };
            
            var ms = 0;
            var sp = resStr.split(".");
            ms = parseInt(sp[1], 10);
            console.log(sp);
            console.log("ms: " + ms);
            
            resStr = "" + sp[0];
            var ar = resStr.split(":");
            var value = ar.pop();
            console.log("ar: ");
            console.log(ar);
            
            var sec = 0;
            var factor = 1;
            while (value && ar.length){
              sec += parseInt(value, 10) * factor;
              factor = factor * 60;
              value = ar.pop();
            };
            
            def.resolve(sec + (ms / 1000));
          });
          
        });
      });
      
      return def;
    }
    
    , getJunkPs: function(parName, par){
      var def = new Deferred();
      var name = this.getFileName(parName);
      console.log("getjunk");
      ///usr/bin/avconv -ss 508 -i "/home/sol/Videos/Youtube/MLP FIM Season 4 Episode 4 Daring Don't HD.mp4" 
      //-acodec libvorbis -f ogg -ar 44100 -t 20 -vcodec libtheora -an -y -s 640x480 -q:v 7 "v1.ogg"
      
      require(["dojo/node!fs", "dojo/node!child_process"], function(fs, child_process){
        //var cache = {'/etc':'/private/etc'};
        fs.realpath(name, function (err, name) {
          if (err){
            console.log(err);
            def.reject();
            return;
          };
          
          var spawn  = child_process.spawn;
          
          var params = [
            '-loglevel', 'quiet',
            '-threads', "4",
            '-ss', "" + (par.junk * par.junkSize),
            '-i', name,
            '-f', "ogg",
            '-acodec', 'libvorbis',
            '-vcodec', 'libtheora',
            '-q:v', '5',
            '-an',
            "-t", "" + (par.junkSize + 1),
            '-s', "" + par.width + "x" + par.height,
            '-threads', "4",
            'pipe:1'
          ];
          var audioParams = [
            '-loglevel', 'quiet',
            '-ss', "" + (par.junk * par.junkSize),
            '-i', name,
            '-f', "ogg",
            '-acodec', 'libvorbis',
            '-ar', '44100',
            '-vn',
            "-t", "" + (par.junkSize + 1),
            '-threads', "2",
            'pipe:1'
          ];
          
          /*var paramStr = "";
          var i = 0;
          for (i = 0; i < params.length; ++i){
            paramStr += params[i] + " ";
          };
          console.log(paramStr);*/
          
          avconv = spawn('avconv', params);
          avconvAudio = spawn('avconv', audioParams);
          
          var base64Str = "";
          var buffersAr = [];
          var stream = avconv.stdout;
          
          var abase64Str = "";
          var abuffersAr = [];
          var astream = avconvAudio.stdout;
          
          var result = {};
          
          stream.on("data", function(data){
            buffersAr.push(data);
          });
          astream.on("data", function(data){
            abuffersAr.push(data);
          });
          stream.on("end", function(data){
            result.base64Src = Buffer.concat(buffersAr).toString("base64");
            if (result.base64AudioSrc){
              def.resolve(result);
            };
          });
          astream.on("end", function(data){
            result.base64AudioSrc = Buffer.concat(abuffersAr).toString("base64");
            if (result.base64Src){
              def.resolve(result);
            };
          });
          
        });
      });
      
      return def;
    }
    
    
  });
});
